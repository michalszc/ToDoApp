import React, { useCallback, useRef, useState } from 'react';
import { useOutsideAlerter } from './hooks/useOutsideAlerter';

export interface ColumnTitleProps {
    title: string,
    onSave: (title: string) => void
  }

export const ColumnTitle = ({title, onSave}: ColumnTitleProps) => {
    const [showInput, setShowInput] = useState(false);
    const [text, setText] = useState(title);
    const wrapperRef:any = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
      if (wrapperRef.current) {
        onSave(wrapperRef.current.value || wrapperRef.current.placeholder);
        setShowInput(false);
      }
    });

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (text.length > 0) {
            onSave(text);
            setShowInput(false);
          }
        }
      }, [text]);

    if (showInput)
        return (
            <input 
                type='text'
                placeholder={text}
                autoFocus
                onChange={(e)=>setText(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={wrapperRef}
                className='min-w-16 h-6 text-[#1e222f] dark:text-[#FFFAFA] text-base font-sans 
                    inline-block clear-both border-solid border-1 border-[#e7eaea] dark:border-[#989898] dark:bg-[#303030]
                    w-full p-0 m-0' />
        )
    return (
        <span onClick={() => setShowInput(true)}
            className='font-sans font-bold text-xl leading-4 tracking-tight text-[#1e222f] dark:text-[#FFFAFA] mt-0 '>
                {text}
        </span> 
    );
}