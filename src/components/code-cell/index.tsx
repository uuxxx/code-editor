import React, { useEffect, useRef, useState } from 'react';
import CodeEditor from '../code-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import useBundler from '../../bundler';
import './styles.css';
import { useActions } from '../../redux/hooks';

interface CodeCellProps {
  cellId: string;
  value: string;
}

export default function CodeCell({ value, cellId }: CodeCellProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState(value);
  const { update } = useActions();

  const compile = useBundler(iframeRef, input);

  useEffect(() => {
    const id = setTimeout(() => {
      update({ id: cellId, newContent: input });
      compile().catch(() => {});
    }, 1000);
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
