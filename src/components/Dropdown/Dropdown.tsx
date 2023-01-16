import styles from "./styles.module.css";
import { ReactComponent as IconDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as IconUp } from "../../assets/icon-chevron-up.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoards,
  getCurrentlySelected,
} from "../../features/boards/boardsSlice";
import {
  addTaskToColumn,
  getColumns,
  removeTaskFromColumn,
} from "../../features/columns/columnsSlice";
import { ID } from "../../common/utils/types";
import { changeTaskColumnId } from "../../features/tasks/tasksSlice";

interface Props {
  currentStatus: number;
  setCurrentStatus: (s: number) => void;
  statuses: { columnId: ID; status: string }[];
  isViewTaskModal?: boolean;
  currentColumnId?: string | null;
  taskId?: ID;
}

const Dropdown = ({
  currentStatus,
  setCurrentStatus,
  statuses,
  isViewTaskModal,
  currentColumnId,
  taskId,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const currentColumnForTask = statuses.find(
    (el) => el.columnId === currentColumnId
  );
  return (
    <div
      className={`${styles.selectWrapper} ${isMenuOpen ? styles.menuOpen : ""}`}
    >
      <p className="subTitle">Current Status</p>
      <div
        className={styles.selectBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <p>
          {isViewTaskModal
            ? currentColumnForTask?.status
            : statuses[currentStatus].status}
        </p>
        <div className={`${styles.iconWrapper} `}>
          <div className={styles.iconDown}>
            <IconDown />
          </div>
          <div className={styles.iconUp}>
            <IconUp />
          </div>
        </div>
      </div>

      <ul className={styles.selectMenu}>
        {statuses.map((s, idx) => (
          <li
            key={s.columnId}
            onClick={() => {
              setCurrentStatus(idx);
              setIsMenuOpen(false);
              if (
                isViewTaskModal &&
                currentColumnId &&
                taskId &&
                currentColumnId !== s.columnId
              ) {
                console.log("currentColumnID:", currentColumnId);
                console.log("newColumnId: ", s.columnId);
                dispatch(
                  removeTaskFromColumn({ columnId: currentColumnId, taskId })
                );
                dispatch(
                  addTaskToColumn({ columnId: s.columnId as string, taskId })
                );
                dispatch(
                  changeTaskColumnId({
                    taskId: taskId as string,
                    columnId: s.columnId as string,
                  })
                );
              }
            }}
          >
            {s.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
