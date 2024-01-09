import { configureStore } from '@reduxjs/toolkit';
import expenseTrackerReducer from '../slices/expense-trackerSlice';

export const store=configureStore({
  reducer: {
    expenses: expenseTrackerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch