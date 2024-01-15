import { ExpenseFormData, IncomeFormData } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const expensesIntialState: ExpenseFormData[] = [];
const incomeInitialState: IncomeFormData[] = [];
const initialState = {
  expenses: expensesIntialState,
  income: incomeInitialState,
};
export const expenseTrackerSlice = createSlice({
  name: "expenseTracker",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseFormData>) => {
      state.expenses = state.expenses.concat(action.payload);
    },
    addIncome: (state, action: PayloadAction<IncomeFormData>) => {
      state.income = state.income.concat(action.payload);
    },
    deleteExpenseById: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    deleteIncomeById: (state, action) => {
      state.income = state.income.filter(
        (income) => income.id !== action.payload
      );
    },
  },
});

export const { addExpense, addIncome, deleteExpenseById, deleteIncomeById } =
  expenseTrackerSlice.actions;

export default expenseTrackerSlice.reducer;
