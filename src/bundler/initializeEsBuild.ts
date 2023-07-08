import * as esbuild from 'esbuild-wasm';

export default async function initialize() {
  await esbuild.initialize({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm',
  });
}
