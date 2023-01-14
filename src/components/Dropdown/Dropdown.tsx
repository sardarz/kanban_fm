import styles from "./styles.module.css";
import { ReactComponent as IconDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as IconUp } from "../../assets/icon-chevron-up.svg";
import { useState } from "react";

const Dropdown = () => {
  const statuses = ["Todo", "Doing", "Done"];
  const [currentStatus, setCurrentStatus] = useState(statuses[1]);
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
        <p>{currentStatus}</p>
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
        {statuses.map((s) => (
          <li
            onClick={() => {
              setCurrentStatus(s);
              setIsMenuOpen(false);
            }}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
