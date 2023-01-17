import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";

interface IBoards {
  byId: IBoard;
  allIds: string[];
  currentlySelected: string;
}

interface IBoard {
  [key: string]: {
    boardId: string;
    name: string;
    columnIds: string[];
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
    boardCreated(
      state,
      action: PayloadAction<{ name: string; columnIds: string[] }>
    ) {
      const id = uuidv4();
      state.byId[id] = {
        boardId: id,
        name: action.payload.name,
        columnIds: action.payload.columnIds,
      };
      state.allIds.push(id);
    },
    updateCurrentlySelected(state, action) {
      state.currentlySelected = action.payload;
    },
    boardEdited(
      state,
      action: PayloadAction<{ name: string; columnIds: string[]; id: string }>
    ) {
      state.byId[action.payload.id].name = action.payload.name;
      state.byId[action.payload.id].columnIds = action.payload.columnIds;
    },
    deleteBoard(state) {
      const currentlySelected = state.currentlySelected;
      const indexOfCS = state.allIds.indexOf(currentlySelected);
      state.allIds.splice(indexOfCS, 1);
      state.currentlySelected = state.allIds[0];
    },
  },
});

export const {
  boardCreated,
  boardEdited,
  updateCurrentlySelected,
  deleteBoard,
} = boardsSlice.actions;

export const getBoards = (state: RootState) => state.boards;

export const getCurrentlySelected = (state: RootState) =>
  state.boards.currentlySelected;

export default boardsSlice.reducer;
