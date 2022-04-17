import React, { useState } from 'react';

interface ContainerProps{
    children: React.ReactNode
}

//flex flex-col border-2 border-solid border-[#282c34] m-h-16
const Container = ({children}: ContainerProps) => (
    <div className='rounded-md border-solid border-[1px] border-[#e7eaea]
                  bg-white text-sm font-bold leading-snug tracking-normal
                   text-[#1e222f] py-4 px-3'>
        {children}
    </div>
)

export interface TaskTextareaProps{
    onTaskSave: (text : string) => void;
}

export const TaskTextarea = (props : TaskTextareaProps)=>{
    const [text, setText] = useState('');

    const onKeyPress = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            if(text.length > 0){
                props.onTaskSave(text);
                setText('');
            }
        }
    }

    return (
        <Container>
            <textarea
                value={text}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
                onKeyPress={ onKeyPress }
                placeholder='Press Enter to Add Task'
                rows={2}
                maxLength={2000}
                className=' text-[#1e222f] text-base font-sans inline-block clear-both border-0 w-full h-fit p-2 m-0 resize-none'
                />
        </Container>
    )
    //m-5 border-1 border-solid border-[#b8b8b8]
}   