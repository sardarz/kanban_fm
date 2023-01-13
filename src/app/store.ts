import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boardsSlice";
import columnsReducer from "../features/columns/columnsSlice";

export default configureStore({
  reducer: {
    boards: boardsReducer,
    columns: columnsReducer,
  },
});

