import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import UnpkgPlugin from './plugins/unpkg';
import FetchPlugin from './plugins/fetch';
import './styles.scss';

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    (async () => {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm',
      });
    })().catch(() => {});
  }, []);
  const [input, setInput] = useState('');
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
    const code = service.outputFiles[0].text;

    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(code, '*');
    }
  };

  const html = /* HTML */ `
    <html>
      <head>
        <script defer>
          window.addEventListener(
            'message',
            ({ data }) => {
              try {
                eval(data);
              } catch (e) {
                document.body.innerHTML = \`<h3 style="color: red;">Error: \${e.message}</h3>\`;
              }
            },
            false
          );
        </script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `;

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

      <iframe
        ref={iframeRef}
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
}
