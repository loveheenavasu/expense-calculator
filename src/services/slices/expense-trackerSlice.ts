import {
  ExpenseFormData,
  ExpenseFormForCategory,
  ExpenseFormForPaidVia,
  ExpenseFormForCategoryPaid,
} from "@/types/Expense";
import { IncomeFormData} from "@/types/Income";
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
    updateExpense: (state, action: PayloadAction<ExpenseFormData>) => {
      const updatedExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      state.expenses[updatedExpenseIndex] = action.payload;
    },
    updateIncome: (state, action: PayloadAction<IncomeFormData>) => {
      const updatedIncomeIndex = state.income.findIndex(
        (income) => income.id === action.payload.id
      );
      state.income[updatedIncomeIndex] = action.payload;
    },
  },
});

export const {
  addExpense,
  addIncome,
  deleteExpenseById,
  deleteIncomeById,
  updateExpense,
  updateIncome,
} = expenseTrackerSlice.actions;

export default expenseTrackerSlice.reducer;
