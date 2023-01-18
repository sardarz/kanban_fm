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
import {
  changeTaskColumnId,
  getTaskById,
} from "../../../features/tasks/tasksSlice";
import styles from "../styles.module.css";

const ViewTaskModal = ({
  taskId,
  closeModal,
}: {
  taskId: string;
  closeModal: () => void;
}) => {
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

  useEffect(() => {
    if (currentColumnId !== task.columnId) {
      const newData = { columnId: currentColumnId, taskId };
      dispatch(removeTaskFromOldColumn({ taskId, columnId: task.columnId }));
      dispatch(addTaskToNewColumn(newData));
      dispatch(changeTaskColumnId(newData));
    }
  }, [currentColumnId]);

  return (
    <div
      className={`${styles.modalBox}`}
      onClick={() => setIsThreeDotsOpen(false)}
    >
      <div className={`${styles.viewTaskHeader}`}>
        <h3 className={`${styles.title}`}>{title}</h3>
        <div
          className={`${styles.threeDots}`}
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
            closeParentModal={closeModal}
          />
        </div>
      </div>
      <p className={`${styles.description}`}>{description}</p>

      <div className={`${styles.subtasksWrapper}`}>
        <p className={`${styles.subtitle}`}>
          Subtasks ({completedTaskAmount} of {task.subtasks.length})
        </p>
        <div className={`${styles.subtasks}`}>
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
