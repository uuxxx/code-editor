import React, { forwardRef } from 'react';
import './styles.css';

const html = /* HTML */ `
  <html>
    <head>
      <script defer>
        const handleError = (e) => {
          document.body.innerHTML = \`<h3 style="color: red;">Error: \${e.message}</h3>\`;
        };

        window.addEventListener('error', (e) =>  {
          e.preventDefault();
          handleError(e);
        });

        window.addEventListener(
          'message',
          ({ data }) => {
            document.body.innerHTML = '';
            try {
              const { ok, text } = JSON.parse(data);
              if (!ok) throw new Error(text);
              eval(text);
            } catch (e) {
              handleError(e);
            }
          },
          false
        );
      </script>
    </head>
    <body>
    </body>
  </html>
`;

export default forwardRef((_, ref: React.ForwardedRef<HTMLIFrameElement>) => (
  <div className="preview__overlay">
    <iframe
      className="preview__iframe"
      ref={ref}
      title="preview"
      srcDoc={html}
      sandbox="allow-scripts"
    />
  </div>
));
