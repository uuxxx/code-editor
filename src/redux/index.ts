import { configureStore } from '@reduxjs/toolkit';
import syncCellsWithLS from './middlewares/syncCellsWithLS';
import cellsReducer from './slices/cellsSlice';

const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([syncCellsWithLS]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
