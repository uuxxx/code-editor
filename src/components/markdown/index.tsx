import React, { useEffect, useState } from 'react';
import Resizable from '../resizable';
import { useActions } from '../../redux/hooks';
import './styles.css';
import ActionBar from '../action-bar';

interface MarkdownProps {
  cellId: string;
  mode?: 'preview' | 'edit';
  value: string;
}

type Align = 'left' | 'center' | 'right' | '';
type Bold = 'bold' | '';
type Italic = 'italic' | '';

enum NavBarButtons {
  FORMAT_BOLD = 'format_bold',
  FORMAT_ALIGN_RIGHT = 'format_align_right',
  FORMAT_ITALIC = 'format_italic',
  FORMAT_ALIGN_LEFT = 'format_align_left',
  FORMAT_ALIGN_CENTER = 'format_align_center',
}

const navbarIcons = [
  NavBarButtons.FORMAT_BOLD,
  NavBarButtons.FORMAT_ITALIC,
  NavBarButtons.FORMAT_ALIGN_LEFT,
  NavBarButtons.FORMAT_ALIGN_CENTER,
  NavBarButtons.FORMAT_ALIGN_RIGHT,
];

function Markdown({ mode, value, cellId }: MarkdownProps) {
  const [bold, setBold] = useState<Bold>('');
  const [italic, setItalic] = useState<Italic>('');
  const [align, setAlign] = useState<Align>('left');
  const [input, setInput] = useState(value);

  const { update } = useActions();

  useEffect(() => {
    const id = setTimeout(() => {
      update({ id: cellId, newContent: input });
    }, 1000);
    return () => clearTimeout(id);
  }, [input]);

  const onNavBarClick = (e: React.MouseEvent) => {
    let { id } = e.target as HTMLButtonElement | HTMLSpanElement;
    if (!id.includes('markdown__navbar-btn')) {
      return;
    }
    [, id] = id.split(' ');
    switch (id) {
      case NavBarButtons.FORMAT_BOLD:
        setBold((prev) => (!prev ? 'bold' : ''));
        break;
      case NavBarButtons.FORMAT_ITALIC:
        setItalic((prev) => (!prev ? 'italic' : ''));
        break;
      case NavBarButtons.FORMAT_ALIGN_LEFT:
        setAlign((prev) => (prev === 'left' ? '' : 'left'));
        break;
      case NavBarButtons.FORMAT_ALIGN_RIGHT:
        setAlign((prev) => (prev === 'right' ? '' : 'right'));
        break;
      case NavBarButtons.FORMAT_ALIGN_CENTER:
        setAlign((prev) => (prev === 'center' ? '' : 'center'));
        break;
      default:
        break;
    }
  };

  return (
    <Resizable direction="y">
      <div className="markdown__container">
        {mode === 'edit' ? (
          <>
            <div onClick={onNavBarClick} className="markdown__navbar">
              <span>
                {navbarIcons.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className="markdown__navbar-item"
                    id={`markdown__navbar-btn ${name}`}
                  >
                    <span
                      id={`markdown__navbar-btn ${name}`}
                      className="material-symbols-outlined"
                    >
                      {name}
                    </span>
                  </button>
                ))}
              </span>

              <ActionBar id={cellId} type="text" />
            </div>
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Напечатайте, что-нибудь..."
              className={`markdown__textarea ${bold} ${italic} ${align}`}
            />
          </>
        ) : (
          <div className="markdown__preview" />
        )}
      </div>
    </Resizable>
  );
}

Markdown.defaultProps = {
  mode: 'edit',
};

export default Markdown;
