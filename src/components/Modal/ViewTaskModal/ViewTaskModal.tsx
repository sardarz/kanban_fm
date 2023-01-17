import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as ThreeDots } from "../../../assets/icon-vertical-ellipsis.svg";
import {
  getBoards,
  getCurrentlySelected,
} from "../../../features/boards/boardsSlice";
import { getColumns } from "../../../features/columns/columnsSlice";
import Dropdown from "../../Dropdown/Dropdown";
import ThreeDotsMenu from "../../ThreeDotsMenu/ThreeDotsMenu";
import SubTaskViewer from "./SubTaskViewer";
import styles from "./subtask.module.css";
import { getTaskById } from "../../../features/tasks/tasksSlice";

const ViewTaskModal = ({
  closeModal,
  taskId,
  columnId
}: {
  closeModal: () => void;
  taskId: string;
  columnId: string | null
}) => {
  const currentlySelected = useSelector(getCurrentlySelected);
  const boards = useSelector(getBoards);
  const columnIds = boards.byId[currentlySelected].columnIds;
  const columns = useSelector(getColumns);
  const columnNames = columnIds.map((id) => ({
    columnName: columns.byId[id].columnName,
    columnId: id,
  }));
  const [currentStatus, setCurrentStatus] = useState(0);

  const task = useSelector(getTaskById(taskId));
  const title = task.title;

  const description = task.description;

  const completedTaskAmount = task.subtasks.filter(
    (el) => el.isCompleted
  ).length;
  const [isThreeDotsOpen, setIsThreeDotsOpen] = useState(false);
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
              subtaskText={subtask.title}
              isDone={subtask.isCompleted}
              taskId={taskId}
            />
          ))}
        </div>
      </div>

      <Dropdown
        columnNames={columnNames}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        isViewTaskModal={true}
        currentColumnId={columnId}
        taskId={taskId}
      />
    </div>
  );
};

export default ViewTaskModal;
