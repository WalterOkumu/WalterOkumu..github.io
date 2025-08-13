export const PALETTE = [
  { name: 'Amber-500', hex: '#F59E0B' },
  { name: 'Blue-500', hex: '#3B82F6' },
  { name: 'Emerald-500', hex: '#10B981' },
  { name: 'Purple-500', hex: '#8B5CF6' },
  { name: 'Rose-500', hex: '#F43F5E' },
  { name: 'Teal-500', hex: '#14B8A6' },
  { name: 'Slate-500', hex: '#64748B' },
  { name: 'Indigo-500', hex: '#6366F1' }
];
export function nextColor(used) {
  for (const c of PALETTE) if (!used.includes(c.hex)) return c.hex;
  return PALETTE[used.length % PALETTE.length].hex;
}
