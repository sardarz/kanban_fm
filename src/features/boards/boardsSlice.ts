import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import baseState from "../../app/data";

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

const data = localStorage.getItem("kanban-data") || baseState;

const allState = JSON.parse(data);

const initialState: IBoards = allState.boards;

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    boardCreated(
      state,
      action: PayloadAction<{ name: string; columnIds: string[]; id: string }>
    ) {
      const id = action.payload.id;
      state.byId[id] = {
        boardId: id,
        name: action.payload.name,
        columnIds: action.payload.columnIds,
      };
      state.allIds.push(id);
      state.currentlySelected = id;
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
      delete state.byId[currentlySelected];
      state.currentlySelected = state.allIds[0] || "";
    },
    addNewColumnToCurrentlySelected(state, action: PayloadAction<string>) {
      state.byId[state.currentlySelected].columnIds.push(action.payload);
    },
  },
});

export const {
  boardCreated,
  boardEdited,
  updateCurrentlySelected,
  deleteBoard,
  addNewColumnToCurrentlySelected,
} = boardsSlice.actions;

export const getBoards = (state: RootState) => state.boards;

export const getCurrentlySelected = (state: RootState) =>
  state.boards.currentlySelected;

export default boardsSlice.reducer;
