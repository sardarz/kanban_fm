import styles from "./styles.module.css";
import { ReactComponent as IconDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as IconUp } from "../../assets/icon-chevron-up.svg";
import { useState } from "react";

interface DropdownProps {
  columns: {
    columnName: string;
    columnId: string;
    taskIds: string[];
  }[];
  currentColumnId: string;
  setCurrentColumnId: (column: string) => void;
}

const Dropdown = ({
  columns,
  currentColumnId,
  setCurrentColumnId,
}: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const columnName = columns.find(
    (column) => column.columnId === currentColumnId
  )?.columnName;
  return (
    <div
      className={`${styles.selectWrapper} ${isMenuOpen ? styles.menuOpen : ""}`}
    >
      <p className="subTitle">Current Status</p>
      <div
        className={styles.selectBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <p>{columnName}</p>
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
        {columns.map((column) => (
          <li
            key={column.columnId}
            onClick={() => {
              setIsMenuOpen(false);
              setCurrentColumnId(column.columnId);
            }}
          >
            {column.columnName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
