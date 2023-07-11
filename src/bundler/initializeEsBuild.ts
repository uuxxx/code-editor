import * as esbuild from 'esbuild-wasm';

export default function initializeEsBuild() {
  return esbuild.initialize({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm',
  });
}
