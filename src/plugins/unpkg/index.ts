import * as esbuild from 'esbuild-wasm';

export default () => ({
  name: 'unpkg-path-plugin',
  setup(build: esbuild.PluginBuild) {
    // root entry
    build.onResolve({ filter: /(^index\.js$)/ }, (args) => ({
      path: args.path,
      namespace: 'a',
    }));
    // import from relative path
    build.onResolve({ filter: /^\.+\// }, (args) => ({
      path: new URL(args.path, `https://unpkg.com//${args.resolveDir}/`).href,
      namespace: 'a',
    }));
    // import main file from a module
    build.onResolve({ filter: /.*/ }, (args) => ({
      path: `https://unpkg.com/${args.path}`,
      namespace: 'a',
    }));
  },
});
