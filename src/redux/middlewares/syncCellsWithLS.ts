import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { stringified } from 'src/utils';

const syncCellsWithLS: Middleware = (api) => (next) => (action: AnyAction) => {
  next(action);
  if (!(action.type as string).startsWith('cells')) {
    return;
  }
  const { cells } = api.getState();
  localStorage.setItem('cells', stringified(cells));
};

export default syncCellsWithLS;
