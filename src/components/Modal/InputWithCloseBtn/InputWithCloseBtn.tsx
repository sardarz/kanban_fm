import styles from "./styles.module.css";
import { ReactComponent as CloseIcon } from "../../../assets/icon-cross.svg";
import { useEffect, useState } from "react";

interface Props {
  onClick: () => void;
  updateGivenText: (idx: number, v: string) => void;
  idx: number;
  title: string;
  type: "task" | "board";
  shouldShowWarning?: boolean;
}

const InputWithCloseBtn = ({
  onClick,
  updateGivenText,
  idx,
  title,
  type,
  shouldShowWarning,
}: Props) => {
  const [value, setValue] = useState(title);

  useEffect(() => {
    updateGivenText(idx, value);
  }, [value, idx, updateGivenText]);

  const placeholder =
    type === "board" ? "Enter column name" : "Enter Subtask Name";
  return (
    <div
      className={`${styles.wrapper} ${
        !value.length && shouldShowWarning
          ? styles.emptyInput
          : styles.notEmptyInput
      }`}
    >
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
