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

import { changeTaskColumnId } from "../../features/tasks/tasksSlice";
import { ColumnNamesMap } from "../Modal/TaskModal/EditTask";

interface Props {
  currentStatus: number;
  setCurrentStatus: (s: number) => void;
  columnNames: { columnId: string; columnName: string }[];
  isViewTaskModal?: boolean;
  currentColumnId?: string | null;
  taskId?: string;
  isEditTaskModal?: boolean;
  setCurrentColumnOfCurrentTask?: (columnName: string) => void;
  currentColumnOfCurrentTask?: string;
  columnNamesMap?: ColumnNamesMap;
}

const Dropdown = ({
  currentStatus,
  setCurrentStatus,
  columnNames,
  isViewTaskModal,
  currentColumnId,
  taskId,
  isEditTaskModal,
  currentColumnOfCurrentTask,
  setCurrentColumnOfCurrentTask,
  columnNamesMap,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const currentColumnForTask = columnNames.find(
    (el) => el.columnId === currentColumnId
  );

  const displayColumnName =
    columnNamesMap?.[currentColumnOfCurrentTask as string].columnName;

  if (isEditTaskModal) {
    return (
      <div
        className={`${styles.selectWrapper} ${
          isMenuOpen ? styles.menuOpen : ""
        }`}
      >
        <p className="subTitle">Current Status</p>
        <div
          className={styles.selectBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <p>{displayColumnName}</p>
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
          {columnNames.map((s, idx) => (
            <li
              key={s.columnId}
              onClick={() => {
                setIsMenuOpen(false);
                if (setCurrentColumnOfCurrentTask)
                  setCurrentColumnOfCurrentTask(s.columnId);
              }}
            >
              {s.columnName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
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
          {isViewTaskModal || isEditTaskModal
            ? currentColumnForTask?.columnName
            : columnNames[currentStatus].columnName}
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
        {columnNames.map((s, idx) => (
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
                dispatch(
                  removeTaskFromColumn({ columnId: currentColumnId, taskId })
                );
                dispatch(addTaskToColumn({ columnId: s.columnId, taskId }));
                dispatch(
                  changeTaskColumnId({
                    taskId: taskId,
                    columnId: s.columnId,
                  })
                );
              }
            }}
          >
            {s.columnName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
