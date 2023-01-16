import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { ID } from "../../common/utils/types";

interface ITasks {
  byId: {
    [key: ID]: ITask;
  };
  allIds: ID[];
}

interface ITask {
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean }[];
  columnId: ID;
  id: ID;
}

const initialState: ITasks = {
  byId: {
    1: {
      id: "1",
      title: "Build UI for onboarding flow",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        {
          title: "Sign up page",
          isCompleted: true,
        },
        {
          title: "Sign in page",
          isCompleted: false,
        },
        {
          title: "Welcome page",
          isCompleted: false,
        },
      ],
      columnId: "aaa",
    },
    2: {
      id: "2",
      title: "Build UI for search",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        {
          title: "Account page",
          isCompleted: false,
        },
        {
          title: "Billing page",
          isCompleted: false,
        },
      ],
      columnId: "aaa",
    },
    3: {
      id: "3",
      title: "Design settings and search pages",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        {
          title: "Internal testing",
          isCompleted: false,
        },
        {
          title: "External testing",
          isCompleted: false,
        },
      ],
      columnId: "bbb",
    },
    4: {
      id: "4",
      title: "Add account management endpoints",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        {
          title: "Settings - Account page",
          isCompleted: true,
        },
        {
          title: "Settings - Billing page",
          isCompleted: true,
        },
        {
          title: "Search page",
          isCompleted: false,
        },
      ],
      columnId: "bbb",
    },
    5: {
      id: "5",
      title: "Design onboarding flow",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        {
          title: "Upgrade plan",
          isCompleted: true,
        },
        {
          title: "Cancel plan",
          isCompleted: true,
        },
        {
          title: "Update payment method",
          isCompleted: false,
        },
      ],
      columnId: "bbb",
    },
    6: {
      id: "6",
      title: "Conduct 5 wireframe tests",
      description: "",
      subtasks: [
        {
          title: "Sign up page",
          isCompleted: true,
        },
        {
          title: "Sign in page",
          isCompleted: false,
        },
        {
          title: "Welcome page",
          isCompleted: false,
        },
      ],
      columnId: "ccc",
    },
    7: {
      id: "7",
      title: "Create wireframe prototype",
      description: "",
      subtasks: [
        {
          title: "Add search endpoint",
          isCompleted: true,
        },
        {
          title: "Define search filters",
          isCompleted: false,
        },
      ],
      columnId: "ccc",
    },
    8: {
      id: "8",
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
  reducers: {
    createNewTask(state, action: PayloadAction<ITask>) {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    removeOldTasksOnBoardEdit(state, action: PayloadAction<string[]>) {
      action.payload.map((id) => {
        delete state.byId[id];
        state.allIds = state.allIds.filter((el) => el !== id);
      });
    },
    updateSubtaskStatus(
      state,
      action: PayloadAction<{ idx: number; taskId: string }>
    ) {
      const currentStatus =
        state.byId[action.payload.taskId].subtasks[action.payload.idx]
          .isCompleted;
      state.byId[action.payload.taskId].subtasks[
        action.payload.idx
      ].isCompleted = !currentStatus;
    },
    changeTaskColumnId(state, action: PayloadAction<{taskId: string, columnId: string}>) {
      state.byId[action.payload.taskId].columnId = action.payload.columnId
    }
  },
});

export const { createNewTask, updateSubtaskStatus, removeOldTasksOnBoardEdit, changeTaskColumnId } =
  tasksSlice.actions;

export const getTaskById = (taskId: ID) => (state: RootState) =>
  state.tasks.byId[taskId];

export default tasksSlice.reducer;
