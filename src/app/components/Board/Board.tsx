import React, { useState } from 'react';
import { Column } from './components/Column';
import { AddColumn } from './components/AddColumn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addNewColumn, BoardColumn } from '../../store/board.slice';


interface ContainerProps{
    children: React.ReactNode
}
// bg-[#282c34] flex flex-row BoardHeight p-3
const Container = ({children}: ContainerProps) => (
    <div className='flex bg-[#A9A9A9] dark:bg-[#121212] w-full h-full min-h-[calc(100vh-6rem)] py-10 px-5'>
        {children}
    </div>
)

const Content = ({children}: ContainerProps) => (
    <div className='flex flex-row flex-wrap w-full gap-1 justify-center xs:justify-start'>
        {children}
    </div>
)

export const Board = () => {

    const columns = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();

    return (
        <Container>
            <Content>
                {
                    columns.map( (column: BoardColumn) =>  <Column key={column.id} id={column.id} title={column.title} tasks={column.tasks} color={column.color} />)
                }
                <AddColumn onClickHandler={()=>dispatch(addNewColumn())}/>
            </Content>
        </Container>
    )
}