import React, { useEffect } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';
import { useAppSelector } from '@store/hooks';
import useBundler from '@bundler';
import typedPostMessage from 'src/communicationWithIframes';
import { Actions } from 'src/communicationWithIframes/types';
import AddCellBar from '../add-cell-bar';
import CellListItem from '../cell-list-item';

export default function CellList() {
  const { data, order } = useAppSelector((state) => state.cells);
  const compile = useBundler();

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const { type, payload } = event.data as {
        type: string;
        payload: number;
      };
      if (type === Actions.SAVED_CODE_REQUIRED) {
        const codeToExecute = data[payload]?.content;
        if (codeToExecute) {
          compile(codeToExecute)
            .then((res) => {
              typedPostMessage(event.source, res);
            })
            .catch(() => {});
        }
      }
    };
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [data]);

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
