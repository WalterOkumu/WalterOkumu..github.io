import { exec as cbExec } from 'child_process'; import { promisify } from 'util'; import path from 'path'; const exec=promisify(cbExec);
export const playwright = { async runSmoke(projectRoot){ try{ await exec('npx playwright test',{cwd:projectRoot}); }catch(e){} return path.join(projectRoot,'playwright-report','index.html'); } };
