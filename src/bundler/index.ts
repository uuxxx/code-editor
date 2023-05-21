import React, { useEffect } from 'react';
import * as esbuild from 'esbuild-wasm';
import UnpkgPlugin from './plugins/unpkg';
import FetchPlugin from './plugins/fetch';

export default function useBundler(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  input: string,
) {
  useEffect(() => {
    (async () => {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm',
      });
    })().catch(() => {});
  }, []);

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

  return async () => {
    let result: { ok: boolean; text: string } = { ok: true, text: '' };
    try {
      const service = await compile();
      const code = service.outputFiles[0].text;
      result = { ok: true, text: code };
    } catch (e) {
      result = { ok: false, text: (e as Error).message || 'unexpected Error' };
    } finally {
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify(result),
          '*',
        );
      }
    }
  };
}
