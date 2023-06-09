import { CellType } from './cell';

export interface MoveCell {
  id: string;
  direction: 'up' | 'down';
}

export interface InsertCellBefore {
  id?: string;
  type: CellType;
}

export interface UpdateCell {
  id: string;
  newContent: string;
}
