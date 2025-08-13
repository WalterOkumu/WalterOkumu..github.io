import fs from 'fs/promises';
import path from 'path';
import { nextColor } from './colors.js';

const REGISTRY_FILE = 'subagents.json';

export class Registry {
  constructor({ projectRoot }) {
    this.projectRoot = projectRoot;
    this.registryPath = path.join(projectRoot, REGISTRY_FILE);
    this._cache = null;
  }
  async ensure() {
    try { await fs.access(this.registryPath); }
    catch {
      const initial = [
        { id:'A0', title:'Project Manager', role:'pm', color: nextColor([]), tools: ['context7'], status:'active' },
        { id:'A1', title:'Orchestrator', role:'orchestrator', color: nextColor([]), tools: ['agent-architect','context7'], status:'active' },
        { id:'A2', title:'Frontend Engineer', role:'frontend', color: nextColor([]), tools: ['playwright','context7'], status:'active' },
        { id:'A3', title:'Git Tracker', role:'gitops', color: nextColor([]), tools: [], status:'active' },
        { id:'A4', title:'Tester', role:'qa', color: nextColor([]), tools: ['playwright'], status:'active' },
        { id:'A5', title:'Content Writer', role:'content', color: nextColor([]), tools: ['context7'], status:'active' },
        { id:'A6', title:'Graphic Designer', role:'design', color: nextColor([]), tools: ['context7'], status:'active' },
        { id:'A7', title:'Auditor', role:'audit', color: nextColor([]), tools: ['context7'], status:'active' },
        { id:'A8', title:'Doc Writer', role:'docs', color: nextColor([]), tools: ['context7'], status:'active' }
      ];
      await fs.writeFile(this.registryPath, JSON.stringify(initial, null, 2));
    }
  }
  async load() {
    const buf = await fs.readFile(this.registryPath, 'utf-8');
    this._cache = JSON.parse(buf); return this._cache;
  }
  async save(list) { this._cache = list; await fs.writeFile(this.registryPath, JSON.stringify(list, null, 2)); }
  pickOwnerFor(task) {
    const t = task.title || '';
    const map = [
      [/^plan|prd|spec|breakdown|milestone/i,'A0'],
      [/^agent|prompt|topology|orchestrator/i,'A1'],
      [/^implement|frontend|ui|next|tailwind|headless|lucide|framer/i,'A2'],
      [/^git|commit|changelog|tag|version|release/i,'A3'],
      [/^test|playwright|a11y|perf|e2e/i,'A4'],
      [/^content|seo|copy|metadata|og|schema/i,'A5'],
      [/^graphic|design|ui polish|figma/i,'A6'],
      [/^audit|compliance|spec check|validation/i,'A7'],
      [/^readme|docs|endpoints|env|examples|test data/i,'A8']
    ];
    for (const [re, id] of map) if (re.test(t)) return this._cache.find(a => a.id===id);
    return this._cache[0];
  }
  async addAgent({ id, title, role, tools=[] }) {
    const list = await this.load(); 
    const used = list.map(a=>a.color);
    list.push({ id, title, role, tools, color: nextColor(used), status:'active' });
    await this.save(list);
  }
}
