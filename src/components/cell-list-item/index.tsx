import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Cell } from '@store/types/cell';
import ActionBar from '../action-bar';
import AddCellBar from '../add-cell-bar';
import CodeCell from '../code-cell';
import Markdown from '../markdown';
import CellListItemContext from './context';
import './styles.css';

interface CellListItemProps {
  cell: Cell;
}

export default memo(({ cell }: CellListItemProps) => {
  const { id, content, type } = cell;

  return (
    <motion.div
      className="cell-list-item__container"
      transition={{ delay: 0.35 }}
      initial={{ opacity: 0, right: -500 }}
      animate={{ opacity: 1, right: 0 }}
      exit={{ opacity: 0, right: 500 }}
    >
      <CellListItemContext.Provider value={cell}>
        <AddCellBar id={id} />
        {type === 'code' ? (
          <>
            <ActionBar id={id} type={type} />
            <CodeCell />
          </>
        ) : (
          <Markdown value={content} cellId={id} />
        )}
      </CellListItemContext.Provider>
    </motion.div>
  );
});
