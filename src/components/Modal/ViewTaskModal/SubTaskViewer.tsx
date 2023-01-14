import { useState } from "react";
import { ReactComponent as Check } from "../../../assets/icon-check.svg";
import styles from "./subtask.module.css";

const CheckBox = ({ isDone }: { isDone: boolean }) => {
  return (
    <div className={`${styles.checkboxWrapper} `}>
      {isDone && <Check />}
    </div>
  );
};

const SubTaskViewer = () => {
  const text = "Research competitor pricing and business models";
  const [isDone, setIsDone] = useState(true);

  return (
    <div className={`${styles.subtask} ${isDone ? styles.isDone : ""}`} onClick={() => setIsDone(!isDone)}>
      <CheckBox isDone={isDone} />
      <p>{text}</p>
    </div>
  );
};

export default SubTaskViewer;
