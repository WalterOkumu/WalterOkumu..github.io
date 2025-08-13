import fs from 'fs/promises';
import path from 'path';
const BOARD_FILE = 'task-progress.md';
const LOCK_FILE = '.task-progress.lock';

function nowUtc() { return new Date().toISOString().replace('T',' ').slice(0,19)+' UTC'; }

export class TaskBoard {
  constructor({ projectRoot }) {
    this.projectRoot = projectRoot;
    this.boardPath = path.join(projectRoot, BOARD_FILE);
    this.lockPath = path.join(projectRoot, LOCK_FILE);
    this._dirty = false;
    this.state = { tasks:[], decisions:[], daily:[] };
  }
  async ensure() { try { await fs.access(this.boardPath); } catch { await fs.writeFile(this.boardPath, this._renderDefault()); } }
  async load() { const txt = await fs.readFile(this.boardPath,'utf-8'); this._parse(txt); return this.state; }
  touch(){ this._dirty = true }
  async saveIfDirty(){ if(!this._dirty) return; await this._withLock(async()=>{ await fs.writeFile(this.boardPath,this._render()); this._dirty=false; }); }
  async appendDailySummary(summary){ this.state.daily.push({ date: nowUtc(), summary }); this._dirty=true; }
  async appendDecision(text){ this.state.decisions.push({ date: nowUtc(), text }); this._dirty=true; }
  shouldDailySummary(){ return this.state.daily.length===0; }
  _renderDefault(){
    const stamp=nowUtc();
    return `# Task Progress

**Last Update (UTC):** ${stamp}

## Subagents
| ID | Title | Role | Color | Tools | Status |
|----|-------|------|-------|-------|--------|
| A0 | Project Manager | pm | Amber | context7 | active |
| A1 | Orchestrator | orchestrator | Blue | agent-architect, context7 | active |
| A2 | Frontend Engineer | frontend | Emerald | playwright, context7 | active |
| A3 | Git Tracker | gitops | Purple | - | active |
| A4 | Tester | qa | Rose | playwright | active |
| A5 | Content Writer | content | Teal | context7 | active |
| A6 | Graphic Designer | design | Slate | context7 | active |
| A7 | Auditor | audit | Indigo | context7 | active |
| A8 | Doc Writer | docs | Amber | context7 | active |

## Tasks
- [ ] #T-100 [Owner: A0] Read PRD and Design Spec; produce plan.md
- [ ] #T-101 [Owner: A1] Design agent topology and prompts
- [ ] #T-102 [Owner: A2] Implement SSR app shell with Headless UI
- [ ] #T-103 [Owner: A4] Add Playwright smoke tests

## Decision Log
- ${stamp}: Initialized task board.

## Daily Sync
`;
  }
  _parse(txt){
    const lines=txt.split(/\r?\n/); const tasks=[];
    for (const line of lines){
      const m = line.match(/^\s*- \[( |x)\]\s+(#[TB]-\d+)\s+\[Owner:\s*(A\d+)\]\s+(.*)$/);
      if(m){ tasks.push({ done: m[1]==='x', id: m[2], owner: m[3], title: m[4].trim() }); }
    }
    this.state.tasks = tasks;
  }
  _render(){
    const stamp=nowUtc();
    const tasks=this.state.tasks.map(t=>`- [${t.done?'x':' '}] ${t.id} [Owner: ${t.owner}] ${t.title}`).join('\n');
    const decisions=this.state.decisions.map(d=>`- ${d.date}: ${d.text}`).join('\n') || `- ${stamp}: Initialized task board.`;
    const daily=this.state.daily.map(d=>`### ${d.date}\n${d.summary}`).join('\n\n');
    return `# Task Progress

**Last Update (UTC):** ${stamp}

## Tasks
${tasks}

## Decision Log
${decisions}

## Daily Sync
${daily}
`;
  }
  async _withLock(fn){
    const start=Date.now();
    while(true){
      try{ await fs.writeFile(this.lockPath,String(process.pid),{flag:'wx'}); break; }
      catch{ if(Date.now()-start>5000) throw new Error('Lock timeout'); await new Promise(r=>setTimeout(r,100)); }
    }
    try{ await fn(); } finally { await fs.unlink(this.lockPath).catch(()=>{}); }
  }
}
