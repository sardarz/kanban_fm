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

const DeleteModal = ({
  type,
  closeModal,
  task,
}: {
  type: string;
  closeModal: () => void;
  task?: ITask;
}) => {
  const boardDescription =
    "Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.";
  const taskDescription =
    "Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.";

  const dispatch = useDispatch();
  const currentlySelected = useSelector(
    (state: RootState) => state.boards.currentlySelected
  );

  const columns = useSelector((state: RootState) => state.columns);

  const currentColumns = useSelector(
    (state: RootState) => state.boards.byId[currentlySelected].columnIds
  );

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
      dispatch(deleteTask(task.id as string));
      dispatch(
        deleteTaskFromColumn({
          taskId: task.id as string,
          columnId: task.columnId as string,
        })
      );
    }
  };

  return (
    <div className="delete">
      <h3 className="title">
        Delete this {type === "board" ? "board" : "task"}?
      </h3>
      <p className="description">
        {type === "board" ? boardDescription : taskDescription}
      </p>
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

export default DeleteModal;
