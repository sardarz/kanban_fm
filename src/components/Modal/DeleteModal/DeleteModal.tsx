import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { deleteBoard } from "../../../features/boards/boardsSlice";
import {
  deleteColumns,
  deleteTaskFromColumn,
} from "../../../features/columns/columnsSlice";
import {
  deleteTask,
  deleteTasks,
  ITask,
} from "../../../features/tasks/tasksSlice";

interface DeleteModalProps {
  type: "board" | "task";
  closeModal: () => void;
  task?: ITask;
}

const DeleteModal = ({ type, closeModal, task }: DeleteModalProps) => {
  const dispatch = useDispatch();
  const currentlySelected = useSelector(
    (state: RootState) => state.boards.currentlySelected
  );
  const currentlySelectedData = useSelector(
    (state: RootState) => state.boards.byId[currentlySelected]
  );
  const columns = useSelector((state: RootState) => state.columns);
  const currentColumns = currentlySelectedData.columnIds;

  const currentTasks = currentColumns
    .map((column) => columns.byId[column].taskIds)
    .flat();

  const onDeleteBoard = () => {
    dispatch(deleteBoard());
    dispatch(deleteColumns(currentColumns));
    dispatch(deleteTasks(currentTasks));
    closeModal();
  };

  const onDeleteTask = () => {
    if (task) {
      dispatch(deleteTask(task.id));
      dispatch(
        deleteTaskFromColumn({
          taskId: task.id,
          columnId: task.columnId,
        })
      );
    }
  };

  let description;

  if (type === "task" && task) {
    description = getDescriptionOfDeleteModal("task", task.title);
  }
  if (type === "board") {
    description = getDescriptionOfDeleteModal(
      "board",
      currentlySelectedData.name
    );
  }

  return (
    <div className="delete">
      <h3 className="title">
        Delete this {type === "board" ? "board" : "task"}?
      </h3>
      <p className="description">{description}</p>
      <div className="deleteBtnsWrapper">
        <button
          type="button"
          className="primary"
          onClick={type === "board" ? onDeleteBoard : onDeleteTask}
        >
          Delete
        </button>
        <button type="button" className="secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};

const getDescriptionOfDeleteModal = (type: string, name: string) => {
  const boardDescription = `Are you sure you want to delete the ‘${name}’ board? This action will remove all columns and tasks and cannot be reversed.`;
  const taskDescription = `Are you sure you want to delete the ‘${name}’ task and its subtasks? This action cannot be reversed.`;

  return type === "board" ? boardDescription : taskDescription;
};

export default DeleteModal;
