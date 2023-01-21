import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import baseState from "../../app/data";

interface ITasks {
  byId: {
    [key: string]: ITask;
  };
  allIds: string[];
}

export interface ITask {
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean; id: string }[];
  columnId: string;
  id: string;
}

const data = localStorage.getItem("kanban-data") || baseState;

const allState = JSON.parse(data);

const initialState: ITasks = allState.tasks;

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createNewTask(state, action: PayloadAction<ITask>) {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    removeOldTasksOnBoardEdit(state, action: PayloadAction<string[]>) {
      action.payload.map((id) => {
        delete state.byId[id];
        state.allIds = state.allIds.filter((el) => el !== id);
        return null
      });
    },
    updateSubtaskStatus(
      state,
      action: PayloadAction<{ idx: number; taskId: string }>
    ) {
      const currentStatus =
        state.byId[action.payload.taskId].subtasks[action.payload.idx]
          .isCompleted;
      state.byId[action.payload.taskId].subtasks[
        action.payload.idx
      ].isCompleted = !currentStatus;
    },
    changeTaskColumnId(
      state,
      action: PayloadAction<{ taskId: string; columnId: string }>
    ) {
      state.byId[action.payload.taskId].columnId = action.payload.columnId;
    },
    updateTask(state, action: PayloadAction<ITask>) {
      const taskId = action.payload.id;
      state.byId[taskId] = action.payload;
    },

    deleteTasks(state, action: PayloadAction<string[]>) {
      action.payload.map((task) => {
        const indexOfTask = state.allIds.indexOf(task.toString());
        state.allIds.splice(indexOfTask, 1);
        delete state.byId[task];
        return null
      });
    },
    deleteTask(state, action: PayloadAction<string>) {
      const indexOfDeletedTask = state.allIds.indexOf(action.payload);

      delete state.byId[action.payload];
      state.allIds.splice(indexOfDeletedTask, 1);
    },
  },
});

export const {
  createNewTask,
  updateSubtaskStatus,
  removeOldTasksOnBoardEdit,
  changeTaskColumnId,
  updateTask,
  deleteTasks,
  deleteTask,
} = tasksSlice.actions;

export const getTaskById = (taskId: string) => (state: RootState) =>
  state.tasks.byId[taskId];

export default tasksSlice.reducer;
