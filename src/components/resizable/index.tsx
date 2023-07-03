import React, { useEffect, useState } from 'react';
import {
  ResizableBox as ReactResizableComponent,
  ResizableBoxProps,
} from 'react-resizable';
import './styles.css';

interface ResizableProps {
  children: React.ReactNode;
  direction: 'x' | 'y';
}

export default function Resizable({ children, direction }: ResizableProps) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [codeEditorWidth, setCodeEditorWidth] = useState(screenWidth * 0.75);

  useEffect(() => {
    let id: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(id);
      id = setTimeout(() => {
        const { innerWidth, innerHeight } = window;
        if (innerWidth * 0.75 < codeEditorWidth) {
          setCodeEditorWidth(innerWidth * 0.75);
        }
        setScreenWidth(innerWidth);
        setScreenHeight(innerHeight);
      }, 500);
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  let boxProps: ResizableBoxProps;

  if (direction === 'x') {
    boxProps = {
      minConstraints: [screenWidth * 0.2, Infinity],
      maxConstraints: [screenWidth * 0.75, Infinity],
      height: Infinity,
      width: codeEditorWidth,
      resizeHandles: ['e'],
      style: { display: 'flex' },
      onResizeStop(_, { size }) {
        setCodeEditorWidth(size.width);
      },
    };
  } else {
    boxProps = {
      minConstraints: [Infinity, 160],
      maxConstraints: [Infinity, screenHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      style: { display: 'flex', position: 'relative' },
    };
  }

  if (direction === 'x') {
    return (
      <ReactResizableComponent
        {...boxProps}
        handle={(
          <div className="resizer horizontal">
            <div />
            <div />
            <div />
          </div>
        )}
      >
        {children}
      </ReactResizableComponent>
    );
  }

  return (
    <ReactResizableComponent
      {...boxProps}
      handle={(
        <div className="resizer vertical">
          <div />
          <div />
          <div />
        </div>
      )}
    >
      {children}
    </ReactResizableComponent>
  );
}
