import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";

interface ITasks {
  byId: {
    [key: string]: ITask;
  };
  allIds: string[];
}

export interface ITask {
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean; id: string }[];
  columnId: string;
  id: string;
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
          id: "aof",
        },
        {
          title: "Sign in page",
          isCompleted: false,
          id: "adw",
        },
        {
          title: "Welcome page",
          isCompleted: false,
          id: "ew2",
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
          id: "ew1",
        },
        {
          title: "Billing page",
          isCompleted: false,
          id: "eqw2",
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
          id: "zvew2",
        },
        {
          title: "External testing",
          isCompleted: false,
          id: "asdew2",
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
          id: "sadzxew2",
        },
        {
          title: "Settings - Billing page",
          isCompleted: true,
          id: "asdsadew2",
        },
        {
          title: "Search page",
          isCompleted: false,
          id: "asdasew2",
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
          id: "dsawq",
        },
        {
          title: "Cancel plan",
          isCompleted: true,
          id: "dsadq221",
        },
        {
          title: "Update payment method",
          isCompleted: false,

          id: "ew2xcv_",
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
          id: "ew2Z",
        },
        {
          title: "Sign in page",
          isCompleted: false,
          id: "@ew2",
        },
        {
          title: "Welcome page",
          isCompleted: false,
          id: "eW2",
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
          id: "ew2DSA2",
        },
        {
          title: "Define search filters",
          isCompleted: false,
          id: "eASDw2",
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
  allIds: ["1", "2", "3", "4", "5", "6", "7", "8"],
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
    changeTaskColumnId(
      state,
      action: PayloadAction<{ taskId: string; columnId: string }>
    ) {
      state.byId[action.payload.taskId].columnId = action.payload.columnId;
    },
    updateTask(state, action: PayloadAction<ITask>) {
      const taskId = action.payload.id;
      state.byId[taskId] = action.payload;
    },

    deleteTasks(state, action: PayloadAction<string[]>) {
      action.payload.map((task) => {
        const indexOfTask = state.allIds.indexOf(task.toString());
        state.allIds.splice(indexOfTask, 1);
        delete state.byId[task];
      });
    },
    deleteTask(state, action: PayloadAction<string>) {
      const indexOfDeletedTask = state.allIds.indexOf(action.payload);

      delete state.byId[action.payload];
      state.allIds.splice(indexOfDeletedTask, 1);
    },
  },
});

export const {
  createNewTask,
  updateSubtaskStatus,
  removeOldTasksOnBoardEdit,
  changeTaskColumnId,
  updateTask,
  deleteTasks,
  deleteTask,
} = tasksSlice.actions;

export const getTaskById = (taskId: string) => (state: RootState) =>
  state.tasks.byId[taskId];

export default tasksSlice.reducer;
