import React, { useRef } from 'react';
import CodeEditor from '../code-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import './styles.css';

export default function CodeCell() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  return (
    <Resizable direction="y">
      <>
        <Resizable direction="x">
          <CodeEditor iframeRef={iframeRef} />
        </Resizable>
        <Preview ref={iframeRef} />
      </>
    </Resizable>
  );
}
