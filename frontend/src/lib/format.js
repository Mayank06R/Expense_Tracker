// INR formatters. India uses 1,00,000 grouping (lakh) via en-IN locale.

const inrFull = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const inrNumber = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export function formatINR(amount) {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return "₹0";
  const value = Math.round(Number(amount));
  return inrFull.format(Math.abs(value));
}

export function formatINRSigned(amount) {
  const value = Number(amount) || 0;
  const sign = value < 0 ? "−" : "";
  return `${sign}${formatINR(value)}`;
}

export function formatNumber(amount) {
  return inrNumber.format(Math.round(Number(amount) || 0));
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function shortDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function monthLabel(date = new Date()) {
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function dayOfMonth(iso) {
  return new Date(iso).getDate();
}

export function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}
