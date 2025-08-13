export const context7 = {
  async dailySummary(board){ const total=board.tasks.length; const done=board.tasks.filter(t=>t.done).length; return `Total: ${total}, Done: ${done}, Todo: ${total-done}`; },
  async packContext(items,limit=2000){ return JSON.stringify(items).slice(0,limit); }
};