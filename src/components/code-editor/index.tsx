import React, { useContext, useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useActions, useAppSelector } from '@store/hooks';
import { Actions } from 'src/communicationWithIframes/types';
import typedPostMessage from 'src/communicationWithIframes';
import CellListItemContext from '../cell-list-item/context';
import './code-editor.css';

interface CodeEditorProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export default function CodeEditor({ iframeRef }: CodeEditorProps) {
  const { update } = useActions();
  const { id } = useContext(CellListItemContext);
  const { content } = useAppSelector((state) => {
    const cell = state.cells.data[id];
    if (cell) {
      return cell;
    }

    return { content: '' };
  });

  const [codeEditorValue, setCodeEditorValue] = useState(content);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      update({ id, newContent: codeEditorValue });
      if (iframeRef.current) {
        typedPostMessage(iframeRef.current.contentWindow, {
          ok: true,
          actionType: Actions.RELOAD_REQUIRED,
          text: '',
        });
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [codeEditorValue]);

  const onClick = () => {
    const formated = prettier
      .format(content, {
        parser: 'babel',
        plugins: [parser],
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    setCodeEditorValue(formated);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button is-warning format"
        type="button"
        onClick={onClick}
      >
        Format
      </button>
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
        value={codeEditorValue}
        onChange={(value) => setCodeEditorValue(value as string)}
      />
    </div>
  );
}
