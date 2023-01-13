import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ID } from "../../common/utils/types";

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
