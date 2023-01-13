import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { ID } from "../../common/utils/types";

interface ITasks {
  byId: {
    [key: ID]: {
      title: string;
      description: string;
      subtasks: string[];
      columnId: ID;
    };
  };
  allIds: ID[];
}

const initialState: ITasks = {
  byId: {
    1: {
      title: "Build UI for onboarding flow",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [],
      columnId: "aaa",
    },
    2: {
      title: "Build UI for search",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [],
      columnId: "aaa",
    },
    3: {
      title: "Design settings and search pages",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [],
      columnId: "bbb",
    },
    4: {
      title: "Add account management endpoints",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [],
      columnId: "bbb",
    },
    5: {
      title: "Design onboarding flow",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [],
      columnId: "bbb",
    },
    6: {
      title: "Conduct 5 wireframe tests",
      description: "",
      subtasks: [],
      columnId: "ccc",
    },
    7: {
      title: "Create wireframe prototype",
      description: "",
      subtasks: [],
      columnId: "ccc",
    },
    8: {
      title:
        "Create paper prototypes and conduct 10 usability tests with potential customers",
      description: "",
      subtasks: [],
      columnId: "ccc",
    },
  },
  allIds: [1, 2, 3, 4, 5, 6, 7, 8],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export const getTaskById = (taskId: ID) => (state: RootState) =>
  state.tasks.byId[taskId];

export default tasksSlice.reducer;
