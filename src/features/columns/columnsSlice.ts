import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import baseState from "../../app/data";

interface IColumns {
  byId: {
    [key: string]: {
      columnId: string;
      columnName: string;
      taskIds: string[];
    };
  };
  allIds: string[];
}
const data = localStorage.getItem("kanban-data") || baseState;

const allState = JSON.parse(data);

const initialState: IColumns = allState.columns;

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addNewColumnsOnBoardCreation(
      state,
      action: PayloadAction<{ columnId: string; columnName: string }[]>
    ) {
      action.payload.map((item) => {
        state.byId[item.columnId] = {
          columnId: item.columnId,
          columnName: item.columnName,
          taskIds: [],
        };
        state.allIds.push(item.columnId);
      });
    },
    addNewTaskToColumns(
      state,
      action: PayloadAction<{ taskId: string; columnId: string }>
    ) {
      state.byId[action.payload.columnId].taskIds.push(action.payload.taskId);
    },
    addNewColumns(
      state,
      action: PayloadAction<{ columnName: string; columnId: string }[]>
    ) {
      action.payload.map((col) => {
        if (!state.allIds.includes(col.columnId)) {
        }
        state.byId[col.columnId] = {
          columnId: col.columnId,
          columnName: col.columnName,
          taskIds: state.byId[col.columnId]?.taskIds || [],
        };
        state.allIds.push(col.columnId);
      });
    },

    removeOldColumns(state, action: PayloadAction<string[]>) {
      action.payload.map((id) => {
        delete state.byId[id];
        state.allIds = state.allIds.filter((el) => el !== id);
      });
    },

    removeTaskFromOldColumn(
      state,
      action: PayloadAction<{ columnId: string; taskId: string }>
    ) {
      const targetIndex = state.byId[action.payload.columnId].taskIds.findIndex(
        (el) => el === action.payload.taskId
      );
      state.byId[action.payload.columnId].taskIds.splice(targetIndex, 1);
    },
    addTaskToNewColumn(
      state,
      action: PayloadAction<{ columnId: string; taskId: string }>
    ) {
      state.byId[action.payload.columnId].taskIds.push(action.payload.taskId);
    },
    deleteColumns(state, action: PayloadAction<string[]>) {
      action.payload.map((column) => {
        const indexOfColumn = state.allIds.indexOf(column);
        state.allIds.splice(indexOfColumn, 1);
        delete state.byId[column];
      });
    },
    deleteTaskFromColumn(
      state,
      action: PayloadAction<{ columnId: string; taskId: string }>
    ) {
      const indexOfTask = state.byId[action.payload.columnId].taskIds.indexOf(
        action.payload.taskId
      );
      state.byId[action.payload.columnId].taskIds.splice(indexOfTask, 1);
    },
    createNewColumnById(state, action: PayloadAction<string>) {
      state.allIds.push(action.payload);
      state.byId[action.payload] = {
        columnId: action.payload,
        columnName: "Column Name",
        taskIds: [],
      };
    },
  },
});

export const {
  addNewTaskToColumns,
  addNewColumns,
  removeOldColumns,
  addNewColumnsOnBoardCreation,
  removeTaskFromOldColumn,
  addTaskToNewColumn,
  deleteColumns,
  deleteTaskFromColumn,
  createNewColumnById,
} = columnsSlice.actions;

export const getColumns = (state: RootState): IColumns => state.columns;

export default columnsSlice.reducer;
