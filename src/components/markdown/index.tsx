import React, { useState } from 'react';
import Resizable from '../resizable';
import './styles.css';

interface MarkdownProps {
  mode?: 'preview' | 'edit';
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

function Markdown({ mode }: MarkdownProps) {
  const [bold, setBold] = useState<Bold>('');
  const [italic, setItalic] = useState<Italic>('');
  const [align, setAlign] = useState<Align>('left');

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
            </div>
            <div
              contentEditable="true"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-ph="Напечатайте, что-нибудь..."
              className={`markdown__content-editable ${bold} ${italic} ${align}`}
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
