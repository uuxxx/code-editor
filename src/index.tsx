import React from 'react';
import { createRoot } from 'react-dom/client';
import initializeEsBuild from '@bundler/initializeEsBuild';
import App from './App';
import './styles.css';

const root = document.getElementById('root') as HTMLElement;

(async () => {
  await initializeEsBuild();
  createRoot(root).render(<App />);
})().catch((e) => {
  root.innerHTML = `<h1 style="color: #fff">An Error occured initializing esbuild! Error: ${
    (e as Error).message
  }</h1>`;
});
