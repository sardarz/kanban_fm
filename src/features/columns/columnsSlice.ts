import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { ID } from "../../common/utils/types";

interface IColumns {
  byId: {
    [key: ID]: {
      columnId: ID;
      status: string;
      taskIds: ID[];
    };
  };
  allIds: ID[];
}

const initialState: IColumns = {
  byId: {
    aaa: {
      columnId: "aaa",
      status: "Todo",
      taskIds: [1, 2],
    },
    bbb: {
      columnId: "bbb",
      status: "Doing",
      taskIds: [3, 4, 5],
    },
    ccc: {
      columnId: "ccc",
      status: "Todo",
      taskIds: [6, 7, 8],
    },
  },
  allIds: ["aaa", "bbb", "ccc"],
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addNewColumnsOnBoardCreation(
      state,
      action: PayloadAction<{ columnId: string; status: string }[]>
    ) {
      action.payload.map((item) => {
        state.byId[item.columnId] = {
          columnId: item.columnId,
          status: item.status,
          taskIds: [],
        };
        state.allIds.push(item.columnId);
      });
    },
    addNewTaskToColumns(
      state,
      action: PayloadAction<{ taskID: ID; columnId: string }>
    ) {
      state.byId[action.payload.columnId].taskIds.push(action.payload.taskID);
    },
    addNewColumns(
      state,
      action: PayloadAction<{ status: string; columnId: ID }[]>
    ) {
      action.payload.map((col) => {
        if (!state.allIds.includes(col.columnId)) {
          state.byId[col.columnId] = {
            columnId: col.columnId,
            status: col.status,
            taskIds: [],
          };
          state.allIds.push(col.columnId);
        }
      });
    },

    removeOldColumns(state, action: PayloadAction<string[]>) {
      action.payload.map((id) => {
        delete state.byId[id];
        state.allIds = state.allIds.filter((el) => el !== id);
      });
    },
  },
});

export const {
  addNewTaskToColumns,
  addNewColumns,
  removeOldColumns,
  addNewColumnsOnBoardCreation,
} = columnsSlice.actions;

export const getColumns = (state: RootState): IColumns => state.columns;

export default columnsSlice.reducer;
