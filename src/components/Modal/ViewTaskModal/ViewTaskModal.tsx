import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ThreeDots } from "../../../assets/icon-vertical-ellipsis.svg";
import {
  getBoards,
  getCurrentlySelected,
} from "../../../features/boards/boardsSlice";
import {
  addTaskToNewColumn,
  getColumns,
  removeTaskFromOldColumn,
} from "../../../features/columns/columnsSlice";
import Dropdown from "../../Dropdown/Dropdown";
import ThreeDotsMenu from "../../ThreeDotsMenu/ThreeDotsMenu";
import SubTaskViewer from "./SubTaskViewer";
import styles from "./subtask.module.css";
import {
  changeTaskColumnId,
  getTaskById,
} from "../../../features/tasks/tasksSlice";

const ViewTaskModal = ({ taskId }: { taskId: string }) => {
  const dispatch = useDispatch();

  const boards = useSelector(getBoards);
  const currentlySelected = useSelector(getCurrentlySelected);
  const columnIds = boards.byId[currentlySelected].columnIds;
  const columns = useSelector(getColumns);
  const columnNames = columnIds.map((id) => ({
    columnName: columns.byId[id].columnName,
    columnId: id,
    taskIds: columns.byId[id].taskIds,
  }));

  const task = useSelector(getTaskById(taskId));
  const title = task.title;
  const description = task.description;

  const [currentColumnId, setCurrentColumnId] = useState(
    columns.byId[task.columnId].columnId
  );

  const completedTaskAmount = task.subtasks.filter(
    (el) => el.isCompleted
  ).length;
  const [isThreeDotsOpen, setIsThreeDotsOpen] = useState(false);

  const firstUpdate = useRef(0);

  useEffect(() => {
    // Пропускаю два рендера, чтобы не диспатчить action, так как StrictMode рендерит два раза
    if (firstUpdate.current < 2) {
      firstUpdate.current++;
      return;
    }
    const newData = { columnId: currentColumnId, taskId };
    dispatch(removeTaskFromOldColumn({ taskId, columnId: task.columnId }));
    dispatch(addTaskToNewColumn(newData));
    dispatch(changeTaskColumnId(newData));
  }, [currentColumnId]);

  return (
    <div className="modalBox" onClick={() => setIsThreeDotsOpen(false)}>
      <div className="viewTaskHeader">
        <h3 className="title">{title}</h3>
        <div
          className={`threeDots ${styles.threeDots}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsThreeDotsOpen(true);
          }}
        >
          <ThreeDots />
          <ThreeDotsMenu
            type="task"
            task={task}
            isThreeDotsOpen={isThreeDotsOpen}
            setIsThreeDotsOpen={setIsThreeDotsOpen}
          />
        </div>
      </div>
      <p className="description">{description}</p>

      <div className="subtasksWrapper">
        <p className="subTitle">
          Subtasks ({completedTaskAmount} of {task.subtasks.length})
        </p>
        <div className="subtasks">
          {task.subtasks.map((subtask, idx) => (
            <SubTaskViewer
              idx={idx}
              key={subtask.id}
              subtaskText={subtask.title}
              isDone={subtask.isCompleted}
              taskId={taskId}
            />
          ))}
        </div>
      </div>

      <Dropdown
        columns={columnNames}
        currentColumnId={currentColumnId}
        setCurrentColumnId={setCurrentColumnId}
      />
    </div>
  );
};

export default ViewTaskModal;
