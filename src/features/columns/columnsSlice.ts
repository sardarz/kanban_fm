import { createSlice } from "@reduxjs/toolkit";
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
      status: "todo",
      taskIds: [1, 2],
    },
    bbb: {
      columnId: "bbb",
      status: "doing",
      taskIds: [3, 4, 5],
    },
    ccc: {
      columnId: "ccc",
      status: "todo",
      taskIds: [6, 7, 8],
    },
  },
  allIds: ["aaa", "bbb"],
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
});

export const getColumns = (state: RootState): IColumns => state.columns;

export default columnsSlice.reducer;
