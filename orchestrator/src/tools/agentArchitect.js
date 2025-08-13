export const agentArchitect = {
  async designTopology(analysis){ return analysis || []; },
  async optimizePrompt(template,constraints){ return `# Optimized\n${template}\n\n> ${JSON.stringify(constraints)}`; },
  async analyzeOverlap(subagents){ if (subagents.length>10) return { action:'propose-merge', details:'>10 agents'}; return null; }
};