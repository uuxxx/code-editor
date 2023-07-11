import * as esbuild from 'esbuild-wasm';
import { Message } from 'src/communicationWithIframes/types';
import UnpkgPlugin from './plugins/unpkg';
import FetchPlugin from './plugins/fetch';

export default function useBundler() {
  const compile = async (input: string) => {
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

  return async (input: string) => {
    let result: Message;
    try {
      const service = await compile(input);
      const code = service.outputFiles[0].text;
      result = { ok: true, text: code, actionType: 'CODE_EXECUTION_REQUIRED' };
    } catch (e) {
      result = {
        ok: false,
        text: (e as Error).message || 'unexpected Error',
        actionType: 'CODE_EXECUTION_REQUIRED',
      };
    }
    return result;
  };
}
