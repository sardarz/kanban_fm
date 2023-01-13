import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boardsSlice";

export default configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

type ID = string | number;

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

interface ITasks {
  byId: {
    [key: ID]: {
      title: string;
      description: string;
      subtasks: string[];
      status: string;
    };
  };
  allIds: ID[];
}
