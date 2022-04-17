import React, { useRef, useState, useCallback } from 'react';
import { useOutsideAlerter } from './hooks/useOutsideAlerter';

interface ContainerProps{
    color: string,
    children: React.ReactNode
}

const Container = ({color,children}: ContainerProps) => (
    <div className='rounded p-3 text-center mb-5 mt-1
                    flex flex-row w-full box-border border-solid 
                    border-[1px] border-[#1e222f]'
        style={{backgroundColor: color}}>
        {children}
    </div>
)

interface ContentProps{
    isDone: boolean,
    content: string,
    onMarkTask: () => void,
    onEditTask: (newText: string) => void,
    onDeleteTask: () => void
}

const Content = ({isDone, content, onMarkTask, onEditTask, onDeleteTask}: ContentProps) => {
    const [showInput, setShowInput] = useState(false);
    const wrapperRef:any = useRef(null);
    const firsRender = useRef(true);
    const [text, setText] = useState(content);
    useOutsideAlerter(wrapperRef, () => {
      if (wrapperRef.current) {
        onEditTask(wrapperRef.current.value || wrapperRef.current.placeholder);
        setShowInput(false);
      }
    });

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (text.length > 0) {
            onEditTask(text);
            setShowInput(false);
          }
        }
      }, [text]);

    useOutsideAlerter(wrapperRef, () => {
          setShowInput(false);
      });

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
    else
        return (
            <>
            <span className={`font-sans text-xl tracking-normal text-center 
                text-[#1e222f] dark:text-[#404040] inline-block m-3.5 w-4/5 break-all bold
                relative cursor-pointer selection:bg-transparent
                after:content-[' '] after:absolute after:top-2/4 after:left-0 after:w-full after:h-1 after:bg-black dark:after:bg-[#404040]
                    ${  
                        !firsRender.current && isDone && "after:animate-lineThrough"
                        || !isDone && "after:invisible"
                    }
                `} 
                onClick={(e)=>{
                    onMarkTask();
                    if(firsRender.current)
                        firsRender.current = false;
                }}
                >
                {text}
            </span>
            <button className='inline-block w-1/6' onClick={()=>setShowInput(prev=>!prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
            <button className='inline-block w-1/6' onClick={onDeleteTask}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
            </>
        )
}

export interface TaskProps{
    color: string,
    isDone: boolean,
    content: string,
    onMarkTask: () => void,
    onEditTask: (newText: string) => void,
    onDeleteTask: () => void
}

export const Task = ({ color, isDone, content, onMarkTask, onEditTask, onDeleteTask}: TaskProps) => {
    return (
        <Container color={color}>
            <Content onMarkTask={onMarkTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask}  isDone={isDone} content={content} />
        </Container>
    )
}