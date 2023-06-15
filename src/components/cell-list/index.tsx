import React from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';
import { useAppSelector } from '../../redux/hooks';
import AddCellBar from '../add-cell-bar';
import CellListItem from '../cell-list-item';

export default function CellList() {
  const { data, order } = useAppSelector((state) => state.cells);

  return (
    <div className="cell-list__container">
      <Reorder.Group axis="y" values={order} onReorder={() => {}}>
        <AnimatePresence>
          {order.length ? (
            order.map((key) => (
              <Reorder.Item dragListener={false} key={key} value={data[key]}>
                <CellListItem cell={data[key]} />
              </Reorder.Item>
            ))
          ) : (
            <AddCellBar id="0" />
          )}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
