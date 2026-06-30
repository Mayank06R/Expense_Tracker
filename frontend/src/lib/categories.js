// Indian-flavoured expense / income categories with default monthly budgets (INR).
// Colors are chosen against the dark indigo-twilight palette.

export const EXPENSE_CATEGORIES = [
  { id: "housing",       label: "Housing",         color: "#F4C95D", budget: 20000, examples: ["Rent", "Society Maintenance", "IKEA"] },
  { id: "food",          label: "Food & Dining",   color: "#FF8B3D", budget: 8000,  examples: ["Zomato", "Swiggy", "Starbucks", "CCD"] },
  { id: "shopping",      label: "Shopping",        color: "#A78BFA", budget: 6000,  examples: ["Amazon", "Flipkart", "Myntra", "Nykaa"] },
  { id: "groceries",     label: "Groceries",       color: "#34D399", budget: 6000,  examples: ["BigBasket", "BlinkIt", "Zepto"] },
  { id: "transport",     label: "Transport",       color: "#22D3EE", budget: 3000,  examples: ["Ola", "Uber", "Metro", "Petrol"] },
  { id: "entertainment", label: "Entertainment",   color: "#F472B6", budget: 2500,  examples: ["Netflix", "Hotstar", "BookMyShow"] },
  { id: "utilities",     label: "Utilities",       color: "#60A5FA", budget: 2500,  examples: ["BESCOM", "Airtel", "Jio", "Indane"] },
  { id: "healthcare",    label: "Healthcare",      color: "#FB7185", budget: 3000,  examples: ["Apollo", "1mg", "Practo"] },
  { id: "education",     label: "Education",       color: "#C4B5FD", budget: 2000,  examples: ["Udemy", "Coursera"] },
  { id: "emi",           label: "EMI & Loans",     color: "#94A3B8", budget: 0,     examples: ["Home Loan", "Credit Card"] },
  { id: "investments",   label: "Investments / SIP", color: "#10B981", budget: 0,    examples: ["Zerodha", "Groww", "SIP"] },
  { id: "other",         label: "Other",           color: "#8F8F8A", budget: 1000,  examples: [] },
];

export const INCOME_CATEGORIES = [
  { id: "salary",        label: "Salary",          color: "#10B981", examples: ["Monthly salary"] },
  { id: "freelance",     label: "Freelance",       color: "#34D399", examples: ["Client work"] },
  { id: "bonus",         label: "Bonus",           color: "#F4C95D", examples: ["Diwali bonus"] },
  { id: "investment",    label: "Investment return", color: "#A78BFA", examples: ["Dividend", "Stock sale"] },
  { id: "gift",          label: "Gift",            color: "#F472B6", examples: ["Shagun"] },
  { id: "other-income",  label: "Other",           color: "#8F8F8A", examples: [] },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export function getCategory(id) {
  return ALL_CATEGORIES.find((c) => c.id === id) || ALL_CATEGORIES[ALL_CATEGORIES.length - 1];
}

export const DEFAULT_BUDGETS = Object.fromEntries(
  EXPENSE_CATEGORIES.map((c) => [c.id, c.budget])
);
