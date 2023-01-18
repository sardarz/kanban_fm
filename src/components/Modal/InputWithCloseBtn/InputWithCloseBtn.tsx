import styles from "./styles.module.css";
import { ReactComponent as CloseIcon } from "../../../assets/icon-cross.svg";
import { useEffect, useState } from "react";

interface Props {
  onClick: () => void;
  updateGivenText: (idx: number, v: string) => void;
  idx: number;
  subtaskTitle?: string;
  type: "task" | "board"
}

const InputWithCloseBtn = ({
  onClick,
  updateGivenText,
  idx,
  subtaskTitle,
  type
}: Props) => {
  const [value, setValue] = useState(subtaskTitle ? subtaskTitle : "");

  useEffect(() => {
    updateGivenText(idx, value);
  }, [value]);

  const placeholder = type === "board" ? "Enter column name" : "Enter Task Name"
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue((v) => (v = e.target.value));
        }}
        placeholder={placeholder}
      />
      <div className={styles.closeBtn} onClick={onClick}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default InputWithCloseBtn;
