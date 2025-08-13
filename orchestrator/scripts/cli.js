#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { Registry } from '../src/registry.js';
import { TaskBoard } from '../src/taskBoard.js';

const cmd = process.argv[2];
const args = process.argv.slice(3);

async function run(){
  const projectRoot=path.resolve(process.cwd(),'..'); // run from orchestrator/
  const registry=new Registry({ projectRoot });
  const board=new TaskBoard({ projectRoot });

  if(cmd==='init'){ await registry.ensure(); await board.ensure(); console.log('Initialized.'); return; }
  if(cmd==='add-agent'){
    const id=args[0]||`A${Math.floor(Math.random()*90+10)}`;
    const title=args[1]||'Custom Agent'; const role=args[2]||'custom';
    await registry.addAgent({ id, title, role, tools: [] }); console.log(`Added ${id} ${title}`); return;
  }
  if(cmd==='add-task'){
    const title=args[0]; const owner=args[1]||'A0';
    if(!title){ console.error('Usage: npm run add:task -- "Title" A2'); process.exit(1); }
    const line=`- [ ] #T-${Math.floor(Math.random()*900+100)} [Owner: ${owner}] ${title}\n`;
    const p=path.join(projectRoot,'task-progress.md'); const txt=await fs.readFile(p,'utf-8'); await fs.writeFile(p,txt+'\n'+line); console.log('Task added.'); return;
  }
  if(cmd==='sync'){ await board.load(); await board.saveIfDirty(); console.log('Synced.'); return; }

  console.log('Commands: init | add-agent | add-task | sync');
}
run().catch(e=>{ console.error(e); process.exit(1); });
