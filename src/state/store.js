const KEY = "fairshare-v1";

export function loadState(seed) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

export function persistState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function nextExpenseId() {
  return `e-${Date.now()}`;
}

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      return { ...state, expenses: [...state.expenses, action.expense] };
    }
    case "DELETE_EXPENSE": {
      return {
        ...state,
        expenses: state.expenses.filter((_, i) => i !== action.index),
      };
    }
    case "UPDATE_EXPENSE": {
      return {
        ...state,
        expenses: state.expenses.map((e, i) =>
          i === action.index ? { ...e, ...action.patch } : e
        ),
      };
    }
    default:
      return state;
  }
}
