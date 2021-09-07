import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { v4 } from 'uuid';
import { DONE, IN_PROGRESS, TODO } from '../../constants/Tasks';
import ITask, { IMoveTask } from '../../interface/ITask';

const initialState: ITask[] = [
  {
    id: v4(),
    name: 'Task 1',
    datetimeStarted: null,
    datetimeEnded: null,
    state: TODO,
  },
  {
    id: v4(),
    name: 'Task 2',
    datetimeStarted: null,
    datetimeEnded: null,
    state: TODO,
  },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => [...state, {
      name: action.payload,
      datetimeStarted: null,
      datetimeEnded: null,
      state: TODO,
      id: v4(),
    }],
    moveTask: (state, action: PayloadAction<IMoveTask>) => state.map((task) => {
      const taskState = get(action, 'payload.state');

      if (task.id === get(action, 'payload.id')) {
        return {
          ...task,
          state: taskState,
          datetimeStarted: taskState === IN_PROGRESS ? new Date() : task.datetimeStarted,
          datetimeEnded: taskState === DONE ? new Date() : task.datetimeEnded,
        };
      }

      return task;
    }),
  },
});

export const { addTask, moveTask } = tasksSlice.actions;

export default tasksSlice.reducer;
