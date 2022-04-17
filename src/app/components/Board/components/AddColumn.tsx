import React from "react";

interface ContainerProps{
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => (
    <div className='rounded-lg bg-white dark:bg-[#282828] dark:text-[#989898] py-6 px-5 my-2 mx-3 min-w-64 max-w-96 h-fit flex justify-center items-center cursor-pointer'>
        {children}
    </div>
)

interface AddButtonProps{
    onClickHandler: () => void
}

const AddButton = ({onClickHandler}: AddButtonProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" 
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={onClickHandler}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

export interface AddColumnProps {
    onClickHandler: () => void;
  }
export const AddColumn = ({onClickHandler}: AddButtonProps) => {

    return (
        <Container>
            <AddButton onClickHandler={onClickHandler}/>
        </Container>
    )
}