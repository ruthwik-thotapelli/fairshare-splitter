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
