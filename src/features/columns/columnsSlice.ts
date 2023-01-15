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
      action: PayloadAction<{ id: string; value: string }[]>
    ) {
      action.payload.map((item) => {
        state.byId[item.id] = {
          columnId: item.id,
          status: item.value,
          taskIds: [],
        };
        state.allIds.push(item.id);
      });
    },
    addNewTaskToColumns(
      state,
      action: PayloadAction<{ taskID: ID; columnId: string }>
    ) {
      state.byId[action.payload.columnId].taskIds.push(action.payload.taskID);
    },
  },
});

export const { addNewTaskToColumns, addNewColumnsOnBoardCreation } =
  columnsSlice.actions;

export const getColumns = (state: RootState): IColumns => state.columns;

export default columnsSlice.reducer;
