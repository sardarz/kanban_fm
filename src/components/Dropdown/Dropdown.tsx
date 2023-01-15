import styles from "./styles.module.css";
import { ReactComponent as IconDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as IconUp } from "../../assets/icon-chevron-up.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getBoards, getCurrentlySelected } from "../../features/boards/boardsSlice";
import { getColumns } from "../../features/columns/columnsSlice";
import { ID } from "../../common/utils/types";

interface Props {
  currentStatus: number
  setCurrentStatus: (s: number) => void
  statuses: {columnId: ID, status: string}[]
}

const Dropdown = ({currentStatus, setCurrentStatus, statuses}: Props) => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`${styles.selectWrapper} ${isMenuOpen ? styles.menuOpen : ""}`}
    >
      <p className="subTitle">Current Status</p>
      <div
        className={styles.selectBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <p>{statuses[currentStatus].status}</p>
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
          <li key={s.columnId}
            onClick={() => {
              setCurrentStatus(idx);
              setIsMenuOpen(false);
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
