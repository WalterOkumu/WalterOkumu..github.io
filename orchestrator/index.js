import dotenv from 'dotenv';
import { Orchestrator } from './orchestrator.js';
dotenv.config();
const orch = new Orchestrator({ projectRoot: process.cwd(), loopIntervalMs: 6000 });
orch.start().catch(e => { console.error(e); process.exit(1); });
