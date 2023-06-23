import { createContext } from 'react';
import { Cell } from '@store/types/cell';

export default createContext<Cell>({
  id: '',
  content: '',
  type: 'text',
});
