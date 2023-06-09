import React from 'react';
import { Cell } from '../../redux/types/cell';
import ActionBar from '../action-bar';
import AddCellBar from '../add-cell-bar';
import CodeCell from '../code-cell';
import Markdown from '../markdown';
import './styles.css';

interface CellListItemProps {
  cell: Cell;
}

export default function CellListItem({ cell }: CellListItemProps) {
  const { id, content, type } = cell;

  return (
    <div className="cell-list-item__container">
      <AddCellBar id={id} />
      {type === 'code' ? (
        <>
          <ActionBar id={id} type={type} />
          <CodeCell value={content} cellId={id} />
        </>
      ) : (
        <Markdown value={content} cellId={id} />
      )}
    </div>
  );
}
