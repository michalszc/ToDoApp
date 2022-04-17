import React from 'react';
import { Task } from './Task';
import { TaskTextarea } from './TaskTextarea';
import { ColumnTitle } from './ColumnTitle';
import { ColorPicker } from './ColorPicker';
import { BoradTask, deleteColumn, addTask, markTask, editTask, deleteTask , setColumnColor, setColumnTitle } from '../../../store/board.slice';
import { useDispatch } from 'react-redux';

interface ContainerProps{
    children: React.ReactNode
}

//flex flex-col bg-white w-48 max-w-96 h-full
const Container = ({children}: ContainerProps) => (
    <div className='rounded-lg bg-white dark:bg-[#282828] py-6 px-5 my-2 mx-3 s:mx-3 sm:mx-5 xl:mx-1 2xl:mx-1 w-[100vw]  s:w-[41vw] sm:w-[40vw] md:w-[28vw] lg:w-[21vw] xl:w-[18vw] 2xl:w-[15vw] lg:min-w-64 lg:max-w-96 h-fit'>
        {children}
    </div>
)

interface DeleteButtonProps{
    onDeleteColumn: () => void
}

const DeleteButton = ({onDeleteColumn}: DeleteButtonProps) => (
    <button className='dark:text-[#989898]' onClick={onDeleteColumn}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    </button>
)

const Header = ({children}: ContainerProps) => (
    <header className='flex flex-row px-5 pb-5 items-center justify-between mb-6'>
    {children}
    </header>
)

const TaskContainer = ({children}: ContainerProps) => (
    <div className='flex flex-col justify-between'>
        {children}
    </div>
)

export interface ColumnProps{
    id: number;
    title: string;
    tasks: Array<BoradTask>;
    color: string;
}

export const Column = ({ id, title, tasks, color }: ColumnProps) => {
    const dispatch = useDispatch();
    return (
        <Container>
            <DeleteButton onDeleteColumn={ () => dispatch(deleteColumn({id})) }/>
            <Header>
                <ColumnTitle title={title} onSave={(title)=>dispatch(setColumnTitle({id, title}))}/>
                <ColorPicker color={color} selectColor={(color) =>dispatch(setColumnColor({id, color}))}/>
            </Header>
            <TaskContainer>
                { tasks.map((task: BoradTask) => <Task 
                                                    key={task.id} 
                                                    color={color} 
                                                    isDone={task.isDone} 
                                                    content={task.text}
                                                    onMarkTask={()=>dispatch(markTask({columnId: id, taskId: task.id}))}
                                                    onEditTask={(newText: string)=>dispatch(editTask({columnId: id, taskId: task.id, newText}))}
                                                    onDeleteTask={()=>dispatch(deleteTask({columnId: id, taskId: task.id}))}
                                                    />) }
            </TaskContainer>
            <TaskTextarea onTaskSave={(task : string) => dispatch(addTask({id, taskText: task}))}/>
        </Container>
    )
}