import React, { useEffect, useRef, useState } from 'react';
import CodeEditor from '../code-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import useBundler from '../../bundler';
import './styles.css';

export default function CodeCell() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState('');

  const compile = useBundler(iframeRef, input);

  useEffect(() => {
    const id = setTimeout(compile, 1000);
    return () => clearTimeout(id);
  }, [input]);

  return (
    <Resizable direction="y">
      <>
        <Resizable direction="x">
          <CodeEditor
            value={input}
            onChangeCallback={(e) => setInput(e as string)}
          />
        </Resizable>
        <Preview ref={iframeRef} />
      </>
    </Resizable>
  );
}
