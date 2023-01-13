import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
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
      taskIds: [],
    },
    bbb: {
      columnId: "bbb",
      status: "doing",
      taskIds: [],
    },
  },
  allIds: ["aaa", "bbb"],
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
});

export const getColumns = (state: any): IColumns => state.columns;

export default columnsSlice.reducer;
