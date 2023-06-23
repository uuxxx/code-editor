import React from 'react';
import { Provider } from 'react-redux';
import store from '@store';
import CellList from './components/cell-list';

export default function App() {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
}
