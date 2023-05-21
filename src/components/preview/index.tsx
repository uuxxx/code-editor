import React, { forwardRef } from 'react';

const html = /* HTML */ `
  <html>
    <head>
      <script defer>
        window.addEventListener(
          'message',
          ({ data }) => {
            document.body.innerHTML = '';
            try {
              const { ok, text } = JSON.parse(data);
              if (!ok) throw new Error(text);
              eval(text);
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

export default forwardRef((_, ref: React.ForwardedRef<HTMLIFrameElement>) => (
  <iframe ref={ref} title="preview" srcDoc={html} sandbox="allow-scripts" />
));
