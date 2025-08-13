import fs from 'fs/promises';
import path from 'path';
import { Registry } from './src/registry.js';
import { TaskBoard } from './src/taskBoard.js';
import { agentArchitect } from './src/tools/agentArchitect.js';
import { context7 } from './src/tools/context7.js';
import { playwright } from './src/tools/playwright.js';

export class Orchestrator {
  constructor(opts = {}) {
    this.projectRoot = opts.projectRoot || process.cwd();
    this.loopIntervalMs = opts.loopIntervalMs || 6000;
    this.board = new TaskBoard({ projectRoot: this.projectRoot });
    this.registry = new Registry({ projectRoot: this.projectRoot });
    this._running = false;
  }
  async start() {
    await this.registry.ensure();
    await this.board.ensure();
    this._running = true;
    console.log('[orchestrator] started');
    while (this._running) {
      try { await this._tick(); } catch (e) { console.error('[tick]', e); }
      await new Promise(r => setTimeout(r, this.loopIntervalMs));
    }
  }
  async _tick() {
    const board = await this.board.load();
    const subagents = await this.registry.load();
    // Assign tasks without owners
    for (const t of board.tasks) {
      if (!t.owner || !subagents.find(a => a.id === t.owner)) {
        const chosen = this.registry.pickOwnerFor(t);
        if (chosen) { t.owner = chosen.id; t.status = t.status || 'todo'; this.board.touch(); }
      }
    }
    // Tests for tasks flagged as needsTest
    for (const t of board.tasks) {
      if (t.needsTest && t.status === 'in-progress') {
        const reportPath = await playwright.runSmoke(this.projectRoot);
        t.artifacts = t.artifacts || []; t.artifacts.push({ name:'playwright-report', path: reportPath });
        t.needsTest = false; this.board.touch();
      }
    }
    // Daily summary
    if (this.board.shouldDailySummary()) {
      const summary = await context7.dailySummary(board);
      await this.board.appendDailySummary(summary);
    }
    // Topology check
    const overlap = await agentArchitect.analyzeOverlap(subagents);
    if (overlap?.action === 'propose-merge') {
      await this.board.appendDecision(`Proposed merge: ${overlap.details}`);
    }
    await this.board.saveIfDirty();
  }
}
