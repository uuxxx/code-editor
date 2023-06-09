import React from 'react';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import store from './redux';

export default function App() {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
}
