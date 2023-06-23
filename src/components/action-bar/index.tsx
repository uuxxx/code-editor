import React from 'react';
import { CellType } from '@store/types/cell';
import { useActions } from '@store/hooks';
import './styles.css';

interface ActionBarProps {
  id: string;
  type: CellType;
}

export default function ActionBar({ id, type }: ActionBarProps) {
  const { move, remove } = useActions();
  const onRemove = () => {
    remove(id);
  };

  const onMoveUp = () => {
    move({ id, direction: 'up' });
  };

  const onMoveDown = () => {
    move({ id, direction: 'down' });
  };

  return (
    <div className={`cell-list-item__action-bar ${type}`}>
      <button onClick={onMoveUp} className="button is-small" type="button">
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
      <button onClick={onMoveDown} className="button is-small" type="button">
        <span className="material-symbols-outlined">arrow_downward</span>
      </button>

      <button onClick={onRemove} className="button is-small" type="button">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}
