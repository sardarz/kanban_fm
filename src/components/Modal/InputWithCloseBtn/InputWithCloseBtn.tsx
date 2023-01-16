import styles from "./styles.module.css";
import { ReactComponent as CloseIcon } from "../../../assets/icon-cross.svg";
import { useEffect, useState } from "react";

interface Props {
  placeholder: string;
  onClick: () => void;
  updateGivenText: (idx: number, v: string) => void;
  idx: number;
  colName?: string;
  subtaskTitle?: string
}

const InputWithCloseBtn = ({
  placeholder,
  onClick,
  updateGivenText,
  idx,
  colName,
  subtaskTitle
}: Props) => {
  const [value, setValue] = useState(colName ? colName : subtaskTitle ? subtaskTitle : "");

  useEffect(() => {
    updateGivenText(idx, value);
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue((v) => (v = e.target.value));

          console.log(value);
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
