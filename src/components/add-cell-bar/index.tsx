import React from 'react';
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
      <button
        onClick={addMarkdown}
        className="button is-primary is-rounded is-hovered"
        type="button"
      >
        + Text
      </button>
      <button
        onClick={addCodeCell}
        className="button is-primary is-rounded is-hovered"
        type="button"
      >
        + Code
      </button>
    </div>
  );
}
