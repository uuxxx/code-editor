import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const cache = localforage.createInstance({
  name: 'upkg-file-cache',
});

export default (input: string) => ({
  name: 'fetch-plugin',
  setup(build: esbuild.PluginBuild) {
    // for entry file
    build.onLoad({ filter: /(^index\.js$)/ }, () => ({
      loader: 'jsx',
      contents: input,
    }));

    // checking whether in cache or not
    build.onLoad({ filter: /.*/ }, async (args) => {
      const cachedContent = await cache.getItem<esbuild.OnLoadResult>(
        args.path,
      );
      return cachedContent;
    });

    // for css imported modules
    build.onLoad({ filter: /.css$/ }, async (args) => {
      const response = await fetch(args.path);

      if (!response.ok) {
        return null;
      }

      const resolveDir = new URL('.', response.url).pathname;
      const contents = await response.text();

      const escaped = contents
        .replace(/\n/g, '')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");

      const finalCode = `
        const style = document.createElement('style')
        style.innerText = '${escaped}'
        document.head.appendChild(style)
          `;

      const result: esbuild.OnLoadResult = {
        contents: finalCode,
        resolveDir,
        loader: 'jsx',
      };

      await cache.setItem(args.path, result);

      return result;
    });

    // for js imported modules
    build.onLoad({ filter: /.*/ }, async (args) => {
      const response = await fetch(args.path);

      if (!response.ok) {
        return null;
      }

      const resolveDir = new URL('.', response.url).pathname;
      const contents = await response.text();

      const result: esbuild.OnLoadResult = {
        contents,
        loader: 'jsx',
        resolveDir,
      };

      await cache.setItem(args.path, result);

      return result;
    });
  },
});
