import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoards,
  getCurrentlySelected,
} from "../../../features/boards/boardsSlice";
import {
  addNewTaskToColumns,
  addTaskToColumn,
  getColumns,
  removeTaskFromColumn,
} from "../../../features/columns/columnsSlice";
import Dropdown from "../../Dropdown/Dropdown";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";
import { v4 as uuidv4 } from "uuid";
import {
  createNewTask,
  ITask,
  updateTask,
} from "../../../features/tasks/tasksSlice";

export interface ColumnNamesMap {
  [key: string]: {
    columnName: string;
    columnId: string;
  };
}

const EditTask = ({
  closeModal,
  task,
}: {
  closeModal?: () => void;
  task: ITask;
}) => {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState(task.title);

  const [taskText, setTaskText] = useState(task.description);

  const [subtasks, setSubtasks] = useState(
    task.subtasks.map((s) => ({
      title: s.title,
      isCompleted: s.isCompleted,
      id: s.id,
    }))
  );

  const removeSubtask = (idx: number) => {
    let temp = subtasks.map((s) => ({
      title: s.title,
      isCompleted: s.isCompleted,
      id: s.id,
    }));
    temp.splice(idx, 1);
    setSubtasks(temp);
  };

  const updateSubtaskText = (idx: number, v: string) => {
    let temp = subtasks.map((s) => ({
      title: s.title,
      isCompleted: s.isCompleted,
      id: s.id,
    }));
    temp[idx].title = v;
    setSubtasks(temp);
  };

  const currentlySelected = useSelector(getCurrentlySelected);
  const boards = useSelector(getBoards);
  const columnIds = boards.byId[currentlySelected].columnIds;
  const columns = useSelector(getColumns);
  const columnNames = columnIds.map((id) => ({
    columnName: columns.byId[id].columnName,
    columnId: id,
  }));
  const columnNamesMap = columnNames.reduce((acc: ColumnNamesMap, cv) => {
    acc[cv.columnId] = cv;
    return acc;
  }, {});

  const [currentStatus, setCurrentStatus] = useState(0);
  const [currentColumnOfCurrentTask, setCurrentColumnOfCurrentTask] = useState(
    task.columnId
  );

  const onSaveTask = () => {
    const updatedTask = {
      id: task.id,
      title: taskTitle,
      description: taskText,
      columnId: currentColumnOfCurrentTask,
      subtasks: subtasks.map((el) => ({
        title: el.title,
        isCompleted: el.isCompleted,
        id: el.id,
      })),
    };

    dispatch(updateTask(updatedTask));
    if (task.columnId !== updatedTask.columnId) {
      console.log("kek");
      console.log("task.columnId", task.columnId);
      console.log("updatedTask.columnId", updatedTask.columnId);
      dispatch(
        removeTaskFromColumn({
          columnId: task.columnId,
          taskId: task.id,
        })
      );
      dispatch(
        addTaskToColumn({ columnId: updatedTask.columnId, taskId: task.id })
      );
    }
    if (closeModal) closeModal();
  };

  return (
    <div className="modalBox">
      <h3 className="title">Edit Task</h3>

      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
          Title
        </label>
        <input
          type="text"
          id="boardName"
          placeholder="e.g. Take coffee break"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
          Description
        </label>
        <textarea
          rows={4}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        ></textarea>
      </div>

      <div className="columnsWrapper">
        <p className="subTitle">Subtasks</p>
        <div className="columns">
          {subtasks.map((sub, idx) => (
            <InputWithCloseBtn
              onClick={() => removeSubtask(idx)}
              key={sub.id}
              placeholder={"Enter subtask name"}
              updateGivenText={updateSubtaskText}
              idx={idx}
              subtaskTitle={sub.title}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setSubtasks([
            ...subtasks,
            { title: "", isCompleted: false, id: uuidv4() },
          ]);
        }}
        type="button"
        className="secondary"
      >
        + Add New Subtask
      </button>

      <Dropdown
        columnNames={columnNames}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        isEditTaskModal={true}
        currentColumnId={task.columnId}
        taskId={task.id}
        setCurrentColumnOfCurrentTask={setCurrentColumnOfCurrentTask}
        currentColumnOfCurrentTask={currentColumnOfCurrentTask}
        columnNamesMap={columnNamesMap}
      />

      <button type="button" className="primary" onClick={onSaveTask}>
        Save Changes
      </button>
    </div>
  );
};

export default EditTask;
