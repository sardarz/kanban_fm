import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoards,
  getCurrentlySelected,
} from "../../../features/boards/boardsSlice";
import {
  addNewTaskToColumns,
  getColumns,
} from "../../../features/columns/columnsSlice";
import Dropdown from "../../Dropdown/Dropdown";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";
import { v4 as uuidv4 } from "uuid";
import { createNewTask } from "../../../features/tasks/tasksSlice";

const TaskModal = ({
  isNewTask,
  closeModal,
}: {
  isNewTask: boolean;
  closeModal?: () => void;
}) => {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState("");

  const [taskText, setTaskText] = useState("");

  const [newSubtasks, setNewSubtasks] = useState([
    { placeholder: "e.g. Make coffee", value: "" },
    { placeholder: "e.g. Drink coffee and smile", value: "" },
  ]);

  const removeSubtask = (idx: number) => {
    let temp = [...newSubtasks];
    temp.splice(idx, 1);
    setNewSubtasks(temp);
  };

  const updateSubtaskText = (idx: number, v: string) => {
    let temp = newSubtasks.slice();
    temp[idx].value = v;
    setNewSubtasks(temp);
  };

  const currentlySelected = useSelector(getCurrentlySelected);
  const boards = useSelector(getBoards);
  const columnIds = boards.byId[currentlySelected].columnIds;
  const columns = useSelector(getColumns);
  const columnNames = columnIds.map((id) => ({
    columnName: columns.byId[id].columnName,
    columnId: id,
    taskIds: columns.byId[id].taskIds,
  }));
  const [currentColumnId, setCurrentColumnId] = useState(columns.allIds[0]);

  const onCreateNewTask = () => {
    const newId = uuidv4();
    const columnId = currentColumnId;
    let newTask = {
      id: newId,
      title: taskTitle,
      description: taskText,
      columnId,
      subtasks: newSubtasks.map((el) => ({
        title: el.value,
        isCompleted: false,
        id: uuidv4(),
      })),
    };

    dispatch(createNewTask(newTask));
    dispatch(addNewTaskToColumns({ taskId: newId, columnId }));
    if (closeModal) closeModal();
  };

  return (
    <div className="modalBox">
      <h3 className="title"> {isNewTask ? "Add New " : "Edit "} Task</h3>

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
          {newSubtasks.map((sub, idx) => (
            <InputWithCloseBtn
              onClick={() => removeSubtask(idx)}
              key={sub.placeholder}
              placeholder={sub.placeholder}
              updateGivenText={updateSubtaskText}
              idx={idx}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setNewSubtasks([
            ...newSubtasks,
            { placeholder: "Enter your subtask", value: "" },
          ]);
        }}
        type="button"
        className="secondary"
      >
        + Add New Subtask
      </button>

      <Dropdown
        columns={columnNames}
        currentColumnId={currentColumnId}
        setCurrentColumnId={setCurrentColumnId}
      />

      <button type="button" className="primary" onClick={onCreateNewTask}>
        Create New Task
      </button>
    </div>
  );
};

export default TaskModal;
