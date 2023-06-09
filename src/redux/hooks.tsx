import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions } from './slices/cellsSlice';
import { RootState, AppDispatch } from '.';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useActions() {
  const dispatch = useAppDispatch();
  const boundActions = bindActionCreators(actions, dispatch);

  return boundActions;
}
