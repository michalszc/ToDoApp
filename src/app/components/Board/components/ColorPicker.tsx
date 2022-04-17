import React, { useRef, useState } from 'react';
import { useOutsideAlerter } from './hooks/useOutsideAlerter';
import { colors } from './../../../store/colors';

interface ContainerProps{
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => (
    <div className='relative z-10'>
        {children}
    </div>
)

interface ColorPickerSelectorProps{
    color: string,
    onClickHandler: () => void,
}

const ColorPickerSelector = ({color, onClickHandler}: ColorPickerSelectorProps) => (
    <div
        onClick={onClickHandler}
        className='flex relative w-8 h-8 rounded-[32px] m-3 bg-black cursor-pointer'
        style={{backgroundColor: color}}
    />
)

const ColorPickerContainer = React.forwardRef(({children}: ContainerProps, ref:  React.Ref<any>) => ( 
    
    <div ref={ref} className='absolute flex flex-wrap top-0 right-0 w-60 rounded-[10px] p-2 bg-[#eee] dark:bg-[#ccc]'>
        {children}
    </div>
));

export interface ColorPickerProps {
    color: string;
    selectColor: (color: string) => void;
  }

export const ColorPicker = ({ color, selectColor }: ColorPickerProps) => {
    const wrapperRef: any = useRef(null);
    const [showColors, setShowColor] = useState(false);
    useOutsideAlerter(wrapperRef, () => {
      setShowColor(false);
    });

    return (
        <Container>
            <ColorPickerSelector  
                color={color}
                onClickHandler={() => {
                    setShowColor(true);
                }}
            />

            {showColors && (
                <ColorPickerContainer ref={wrapperRef}>
                {
                    colors.map((selectedColor: string,i: number) => (
                    <ColorPickerSelector key={i} color={selectedColor} onClickHandler={() => {
                        setShowColor(false);
                        selectColor(selectedColor);
                    }}/>
                    ))
                }
                </ColorPickerContainer>
            )}
        </Container>
    )
}