import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { colors } from './colors';
import * as _ from "lodash";

export interface BoradTask{
    id: number,
    isDone: boolean,
    text: string
}

export interface BoardColumn {
  id: number;
  title: string;
  tasks: Array<BoradTask>;
  color: string;
}

export type BoardSliceState = Array<BoardColumn>;

const firstInitialColumn: BoardColumn = {
  id: Date.now(),
  title: 'Please input title...',
  tasks: [],
  color: _.sample(colors) || ''
}

const initialState: BoardSliceState = [firstInitialColumn];

export const slice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    addNewColumn: (state: BoardSliceState) => {
      state.push({
        id: Date.now(),
        title: 'Please input title...',
        tasks: [],
        color: _.sample(colors) || ''
      })
    },
    deleteColumn: (state: BoardSliceState, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const index = state.findIndex((column: BoardColumn) => column.id === id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    },
    addTask: (state: BoardSliceState, action: PayloadAction<{ id: number, taskText: string }>) => {
      const { id, taskText } = action.payload;
      const index = state.findIndex((column: BoardColumn) => column.id === id);
      state[index].tasks.push({
          id: Date.now(),
          isDone: false,
          text: taskText
      })
    },
    markTask: (state: BoardSliceState, action: PayloadAction<{ columnId: number, taskId: number }>) => {
      const { columnId, taskId } = action.payload;
      const index = state.findIndex((column: BoardColumn) => column.id === columnId);
      const taskIndex = state[index].tasks.findIndex( (task: BoradTask) => task.id == taskId );
      state[index].tasks[taskIndex] = {...state[index].tasks[taskIndex], isDone: !(state[index].tasks[taskIndex].isDone)};
    },
    editTask: (state: BoardSliceState, action: PayloadAction<{ columnId: number, taskId: number, newText: string }>) => {
      const { columnId, taskId, newText } = action.payload;
      const index = state.findIndex((column: BoardColumn) => column.id === columnId);
      const taskIndex = state[index].tasks.findIndex( (task: BoradTask) => task.id == taskId );
      state[index].tasks[taskIndex] = {...state[index].tasks[taskIndex], text: newText};
    },
    deleteTask: (state: BoardSliceState, action: PayloadAction<{ columnId: number, taskId: number }>) => {
      const { columnId, taskId } = action.payload;
      const index = state.findIndex((column: BoardColumn) => column.id === columnId);
      state[index].tasks = state[index].tasks.filter( (task: BoradTask) => task.id != taskId );
    },
    setColumnTitle: (state: BoardSliceState, action: PayloadAction<{ id: number, title: string }>) => {
      const { id, title } = action.payload;
      const index = state.findIndex((column: BoardColumn) => column.id === id);
      state[index].title = title;
    },
    setColumnColor: (state: BoardSliceState, action: PayloadAction<{ id: number, color: string }>) => {
      const { id, color } = action.payload;
      const index = state.findIndex((column: BoardColumn) => column.id === id);
      state[index].color = color;
    }
  }
})

export const { addNewColumn, deleteColumn, addTask, markTask, deleteTask, editTask, setColumnTitle, setColumnColor } = slice.actions;

export default slice.reducer;
