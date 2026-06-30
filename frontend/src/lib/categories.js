// Category catalog for income & expense transactions.
// Colors are chosen to live alongside the sage/terracotta palette.

export const EXPENSE_CATEGORIES = [
  { id: "food", label: "Food & Drink", color: "#A25F56", icon: "Utensils" },
  { id: "transport", label: "Transport", color: "#7E6A52", icon: "Bus" },
  { id: "housing", label: "Housing", color: "#4C5C6F", icon: "Home" },
  { id: "shopping", label: "Shopping", color: "#B58463", icon: "ShoppingBag" },
  { id: "health", label: "Health", color: "#4C7A5D", icon: "HeartPulse" },
  { id: "entertainment", label: "Leisure", color: "#8A6BAE", icon: "Film" },
  { id: "bills", label: "Bills", color: "#3F5350", icon: "Receipt" },
  { id: "other", label: "Other", color: "#8F8F8A", icon: "MoreHorizontal" },
];

export const INCOME_CATEGORIES = [
  { id: "salary", label: "Salary", color: "#4C7A5D", icon: "Briefcase" },
  { id: "freelance", label: "Freelance", color: "#6F9A7D", icon: "Laptop" },
  { id: "gift", label: "Gift", color: "#B58463", icon: "Gift" },
  { id: "investment", label: "Investment", color: "#3F5350", icon: "TrendingUp" },
  { id: "other-income", label: "Other", color: "#8F8F8A", icon: "PlusCircle" },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export function getCategory(id) {
  return ALL_CATEGORIES.find((c) => c.id === id) || ALL_CATEGORIES[ALL_CATEGORIES.length - 1];
}
