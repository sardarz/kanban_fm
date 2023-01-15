import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { ID } from "../../common/utils/types";

interface IBoards {
  byId: IBoard;
  allIds: ID[];
  currentlySelected: ID;
}

interface IBoard {
  [key: ID]: {
    boardId: ID;
    name: string;
    columnIds: ID[];
  };
}

const initialState: IBoards = {
  byId: {
    pl: {
      boardId: "pl",
      name: "Platform Launch",
      columnIds: ["aaa", "bbb"],
    },
    mp: {
      boardId: "mp",
      name: "Marketing Plan",
      columnIds: ["ccc"],
    },
  },
  allIds: ["pl", "mp"],
  currentlySelected: "pl",
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    boardCreated(state, action) {
      const id = uuidv4();
      state.byId[id] = {
        boardId: id,
        name: action.payload,
        columnIds: [],
      };
      state.allIds.push(id);
    },
    updateCurrentlySelected(state, action) {
      state.currentlySelected = action.payload;
    },
  },
});

export const { boardCreated, updateCurrentlySelected } = boardsSlice.actions;

export const getBoards = (state: RootState) => state.boards;

export const getCurrentlySelected = (state: RootState) => state.boards.currentlySelected

export default boardsSlice.reducer;
