// Helpers for month-aware computations on the transaction list.

export function sameMonth(iso, ref) {
  const d = new Date(iso);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

export function previousMonth(ref) {
  const d = new Date(ref.getFullYear(), ref.getMonth() - 1, 1);
  return d;
}

export function startOfMonth(ref) {
  return new Date(ref.getFullYear(), ref.getMonth(), 1);
}

export function dayIndex(iso, ref) {
  return new Date(iso).getDate();
}

export function buildDailySeries(transactions, ref) {
  const year = ref.getFullYear();
  const month = ref.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const series = Array.from({ length: days }, (_, i) => ({ day: i + 1, expense: 0, income: 0 }));
  for (const t of transactions) {
    if (!sameMonth(t.date, ref)) continue;
    const d = new Date(t.date).getDate();
    if (t.type === "expense") series[d - 1].expense += Number(t.amount) || 0;
    else series[d - 1].income += Number(t.amount) || 0;
  }
  return series;
}

export function buildCategoryTotals(transactions, ref) {
  const map = new Map();
  for (const t of transactions) {
    if (!sameMonth(t.date, ref)) continue;
    if (t.type !== "expense") continue;
    map.set(t.category, (map.get(t.category) || 0) + Number(t.amount));
  }
  return map;
}
