import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoards,
  getCurrentlySelected,
} from "../../../features/boards/boardsSlice";
import {
  addNewTaskToColumns,
  addTaskToNewColumn,
  getColumns,
  removeTaskFromOldColumn,
} from "../../../features/columns/columnsSlice";
import Dropdown from "../../Dropdown/Dropdown";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";
import { v4 as uuidv4 } from "uuid";
import {
  createNewTask,
  ITask,
  updateTask,
} from "../../../features/tasks/tasksSlice";
import styles from "../styles.module.css";
import Button from "../../Button/Button";

const TaskModal = ({
  closeModal,
  task,
}: {
  closeModal?: () => void;
  task: ITask | null;
}) => {
  const isNewTask = task ? false : true;
  const dispatch = useDispatch();

  if (!task) {
    task = {
      title: "",
      description: "",
      subtasks: [
        {
          title: "",
          isCompleted: false,
          id: uuidv4(),
        },
        {
          title: "",
          isCompleted: false,
          id: uuidv4(),
        },
      ],
      columnId: "",
      id: uuidv4(),
    };
  }

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
    taskIds: columns.byId[id].taskIds,
  }));
  const [currentColumnId, setCurrentColumnId] = useState(
    isNewTask ? columnIds[0] : columns.byId[task.columnId].columnId
  );

  const [canCreateOrUpdateComponent, setCanCreateOrUpdateComponent] =
    useState(true);

  const componentHasEmptyField = () => {
    const hasEmptySubtask = subtasks.find((s) => s.title.length === 0);
    if (!taskTitle.length || hasEmptySubtask) return true;
    return false;
  };

  const onCreateNewTask = () => {
    if (componentHasEmptyField()) {
      setCanCreateOrUpdateComponent(false);
      return;
    }
    const newId = uuidv4();
    const columnId = currentColumnId;
    let newTask = {
      id: newId,
      title: taskTitle,
      description: taskText,
      columnId,
      subtasks: subtasks.map((el) => ({
        title: el.title,
        isCompleted: false,
        id: el.id,
      })),
    };

    dispatch(createNewTask(newTask));
    dispatch(addNewTaskToColumns({ taskId: newId, columnId }));
    if (closeModal) closeModal();
  };

  const onSaveTask = (task: ITask) => {
    if (componentHasEmptyField()) {
      setCanCreateOrUpdateComponent(false);
      return;
    }
    const updatedTask = {
      id: task.id,
      title: taskTitle,
      description: taskText,
      columnId: currentColumnId,
      subtasks: subtasks.map((el) => ({
        title: el.title,
        isCompleted: el.isCompleted,
        id: el.id,
      })),
    };

    dispatch(updateTask(updatedTask));
    if (task.columnId !== updatedTask.columnId) {
      dispatch(
        removeTaskFromOldColumn({
          columnId: task.columnId,
          taskId: task.id,
        })
      );
      dispatch(
        addTaskToNewColumn({ columnId: updatedTask.columnId, taskId: task.id })
      );
    }
    if (closeModal) closeModal();
  };

  return (
    <div
      className={`${styles.modalBox} ${
        !canCreateOrUpdateComponent && !taskTitle.length
          ? styles.cannotCreateOrUpdateComponent
          : ""
      }`}
    >
      <h3 className={`${styles.title}`}>
        {" "}
        {isNewTask ? "Add New " : "Edit "} Task
      </h3>

      <div
        className={`${styles.inputWrapper} ${
          taskTitle.length === 0 && !canCreateOrUpdateComponent
            ? styles.emptyInputTitle
            : ""
        }`}
      >
        <label htmlFor="taskName" className={`${styles.subtitle}`}>
          Title
        </label>
        <input
          type="text"
          id="taskName"
          placeholder="e.g. Take coffee break"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className={`${styles.inputWrapper}`}>
        <label htmlFor="taskDescription" className={`${styles.subtitle}`}>
          Description
        </label>
        <textarea
          rows={4}
          id="taskDescription"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        ></textarea>
      </div>

      <div className={`${styles.columnsWrapper}`}>
        <p className={`${styles.subtitle}`}>Subtasks</p>
        <div className={`${styles.columns}`}>
          {subtasks.map((sub, idx) => (
            <InputWithCloseBtn
              onClick={() => removeSubtask(idx)}
              key={sub.id}
              updateGivenText={updateSubtaskText}
              idx={idx}
              type="task"
              title={sub.title}
              shouldShowWarning={!canCreateOrUpdateComponent}
            />
          ))}
        </div>
      </div>

      <Button
        text="+ Add New Subtask"
        onClick={() => {
          setSubtasks([
            ...subtasks,
            { title: "", isCompleted: false, id: uuidv4() },
          ]);
        }}
        typeOfBtn="modalSecondary"
      />

      <Dropdown
        columns={columnNames}
        currentColumnId={currentColumnId}
        setCurrentColumnId={setCurrentColumnId}
      />

      <Button
        typeOfBtn="modalPrimary"
        onClick={isNewTask ? onCreateNewTask : () => onSaveTask(task as ITask)}
        text={isNewTask ? "Create New Task" : "Save Changes"}
      />
    </div>
  );
};

export default TaskModal;
