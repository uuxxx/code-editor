import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import AddCellBar from '../add-cell-bar';
import CellListItem from '../cell-list-item';

export default function CellList() {
  const { data, order } = useAppSelector((state) => state.cells);

  return (
    <div className="cell-list__container">
      {order.length ? (
        order.map((key) => <CellListItem key={key} cell={data[key]} />)
      ) : (
        <AddCellBar id="0" />
      )}
    </div>
  );
}
