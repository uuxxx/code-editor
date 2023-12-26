import * as esbuild from 'esbuild-wasm';
import { Actions, Message } from 'src/communicationWithIframes/types';
import { transformSync } from '@babel/core';
import babelPluginPreventInfiniteLoops
  from '@bundler/plugins/babel/babel-plugin-prevent-infinite-loops';
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
      const codeTranspiledByEsbuild = service.outputFiles[0].text;
      const codeTranspiledByBabel = transformSync(codeTranspiledByEsbuild, { plugins: [babelPluginPreventInfiniteLoops] })?.code;
      if (!codeTranspiledByBabel) {
        throw new Error('Babel is unable to parse your code...');
      }
      result = { ok: true, text: codeTranspiledByBabel, actionType: Actions.CODE_EXECUTION_REQUIRED };
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
