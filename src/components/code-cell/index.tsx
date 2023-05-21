import React, { useEffect, useRef, useState } from 'react';
import CodeEditor from '../code-editor';
import Preview from '../preview';
import useBundler from '../../bundler';

export default function CodeCell() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState('');

  const compile = useBundler(iframeRef, input);

  useEffect(() => {
    // if (!input.length) return;
    const id = setTimeout(compile, 1000);
    return () => clearTimeout(id);
  }, [input]);

  return (
    <div>
      <CodeEditor
        value={input}
        onChangeCallback={(e) => setInput(e as string)}
      />
      <Preview ref={iframeRef} />
    </div>
  );
}
