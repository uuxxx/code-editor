import React, { useEffect, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import UnpkgPlugin from './plugins/unpkg';
import FetchPlugin from './plugins/fetch';
import './styles.scss';

export default function App() {
  useEffect(() => {
    (async () => {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm',
      });
    })().catch(() => {});
  }, []);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const compile = async () => {
    const service = await esbuild.build({
      entryPoints: ['index.js'],
      target: 'es2015',
      bundle: true,
      write: false,
      plugins: [UnpkgPlugin(), FetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    return service;
  };
  const onClick = async () => {
    const service = await compile();
    setOutput(service.outputFiles[0].text);
  };
  return (
    <div>
      <textarea
        style={{ width: '400px', height: '150px' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" onClick={onClick}>
        submit
      </button>
      <p>{output}</p>
    </div>
  );
}
