import React, { forwardRef, useContext } from 'react';
import { Actions, MessageFromIframe } from 'src/communicationWithIframes/types';
import { stringified } from 'src/utils';
import CellsListItemContext from '../cell-list-item/context';
import './styles.css';

const html = (id: string) => /* HTML */ {
  const message: MessageFromIframe = {
    type: Actions.SAVED_CODE_REQUIRED,
    payload: id,
  };

  return `
  <html>
    <head>
      <style>
        html {
          background: #fff;
        }
      </style>
      <script defer>
        const handleError = (e) => {
          const body = document.body;
          body.innerHTML = \`<h3 style="color: red;">Error: \${e.message}</h3>\`;
          body.style.background = '#fff';
        };

        function onLoad() {
          const message = ${stringified(message)};
          window.parent.postMessage(message, '*');
        }

        function onMessage({ data }) {
          try {
            const { ok, text, actionType } = JSON.parse(data);
            if (actionType === 'RELOAD_REQUIRED') {
              location.reload();
              return;
            }
            if (!ok) {
              throw new Error(text);
            }
            eval(text);
          } catch (e) {
            handleError(e);
          }
        }

        window.addEventListener('error', (e) => {
          e.preventDefault();
          handleError(e);
        });
        window.addEventListener('load', onLoad);
        window.addEventListener('message', onMessage, false);
      </script>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`;
};

export default forwardRef((_, ref: React.ForwardedRef<HTMLIFrameElement>) => {
  const { id } = useContext(CellsListItemContext);
  return (
    <div className="preview__overlay">
      <iframe
        className="preview__iframe"
        ref={ref}
        title="preview"
        srcDoc={html(id)}
        sandbox="allow-scripts"
      />
    </div>
  );
});
