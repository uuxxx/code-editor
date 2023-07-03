import React from 'react';
import { motion } from 'framer-motion';
import { useActions } from '@store/hooks';
import './styles.css';

interface AddCellBarProps {
  id: string;
}

export default function AddCellBar({ id }: AddCellBarProps) {
  const { insertBefore } = useActions();

  const addMarkdown = () => {
    insertBefore({ type: 'text', id });
  };

  const addCodeCell = () => {
    insertBefore({ type: 'code', id });
  };

  return (
    <motion.div
      className="cell-list__action-bar"
      transition={{ delay: 0.35 }}
      initial={{ opacity: 0, right: -500 }}
      animate={{ opacity: 1, right: 0 }}
      exit={{ opacity: 0, right: 500 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={addMarkdown}
        className="button is-primary is-rounded is-hovered"
        type="button"
      >
        + Text
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={addCodeCell}
        className="button is-primary is-rounded is-hovered"
        type="button"
      >
        + Code
      </motion.button>
    </motion.div>
  );
}
