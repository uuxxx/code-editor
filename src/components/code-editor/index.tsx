import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';

interface CodeEditorProps {
  value: string;
  onChangeCallback: (e?: string) => void;
}

export default function CodeEditor({
  value,
  onChangeCallback,
}: CodeEditorProps) {
  const onClick = () => {
    const formated = prettier
      .format(value, {
        parser: 'babel',
        plugins: [parser],
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    onChangeCallback(formated);
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
        value={value}
        onChange={onChangeCallback}
      />
    </div>
  );
}
