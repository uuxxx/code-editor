import { configureStore } from '@reduxjs/toolkit';
import cellsReducer from './slices/cellsSlice';

const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
