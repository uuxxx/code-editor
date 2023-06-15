import React from 'react';
import { motion } from 'framer-motion';
import { useActions } from '../../redux/hooks';
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
    <div className="cell-list__action-bar">
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
    </div>
  );
}
