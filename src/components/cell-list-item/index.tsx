import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      className="cell-list-item__container"
      transition={{ delay: 0.35 }}
      initial={{ opacity: 0, right: -500 }}
      animate={{ opacity: 1, right: 0 }}
      exit={{ opacity: 0, right: 500 }}
    >
      <AddCellBar id={id} />
      {type === 'code' ? (
        <>
          <ActionBar id={id} type={type} />
          <CodeCell value={content} cellId={id} />
        </>
      ) : (
        <Markdown value={content} cellId={id} />
      )}
    </motion.div>
  );
}
