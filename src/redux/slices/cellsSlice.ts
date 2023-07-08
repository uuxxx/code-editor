import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../types/cell';
import { InsertCellBefore, MoveCell, UpdateCell } from '../types/payloads';
import { randomId } from '../../utils';

interface CellsState {
  data: { [key: string]: Cell };
  loading: boolean;
  error: string | null;
  order: string[];
}

function initialState(): CellsState {
  const dataFromLS = localStorage.getItem('cells');
  if (dataFromLS) {
    return JSON.parse(dataFromLS) as CellsState;
  }

  return {
    data: {},
    loading: false,
    error: null,
    order: [],
  };
}

const cellsSlice = createSlice({
  name: 'cells',
  initialState: initialState(),
  reducers: {
    update: (state, { payload }: PayloadAction<UpdateCell>) => {
      const { id, newContent } = payload;
      state.data[id].content = newContent;
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      delete state.data[payload];
      state.order = state.order.filter((id) => id !== payload);
    },
    move: (state, { payload }: PayloadAction<MoveCell>) => {
      const { id, direction } = payload;
      const index = state.order.findIndex((orderId) => orderId === id);

      if (direction === 'up') {
        if (index > 0) {
          const temp = state.order[index - 1];
          state.order[index - 1] = state.order[index];
          state.order[index] = temp;
        }
      } else if (index < state.order.length - 1) {
        const temp = state.order[index + 1];
        state.order[index + 1] = state.order[index];
        state.order[index] = temp;
      }
    },

    insertBefore: (state, { payload }: PayloadAction<InsertCellBefore>) => {
      const { id, type } = payload;
      const newId = randomId();

      state.data[newId] = {
        id: newId,
        content: '',
        type,
      };

      if (!id) {
        state.order.unshift(newId);
      } else {
        const index = state.order.findIndex((orderId) => id === orderId);
        state.order.splice(index, 0, newId);
      }
    },
  },
});

export const { actions } = cellsSlice;
export default cellsSlice.reducer;
