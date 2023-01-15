import styles from "./styles.module.css";
import { ReactComponent as CloseIcon } from "../../../assets/icon-cross.svg";
import { useState } from "react";

interface Props {
  placeholder: string;
  onClick: () => void;
  updateSubtaskText: (idx: number, v: string) => void
  idx: number
}

const InputWithCloseBtn = ({
  placeholder,
  onClick,
  updateSubtaskText,
  idx
}: Props) => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          updateSubtaskText(idx, e.target.value)
          setValue(e.target.value);
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
