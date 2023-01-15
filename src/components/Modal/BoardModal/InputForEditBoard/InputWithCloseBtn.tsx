import styles from "./styles.module.css";
import { ReactComponent as CloseIcon } from "../../../../assets/icon-cross.svg";
import { useEffect, useState } from "react";

interface Props {
  colName: string;
  updateGivenText: (idx: number, value: string) => void;
  idx: number;
  removeColumn: (idx: number) => void;
}

const InputWithCloseBtn = ({
  colName,
  updateGivenText,
  idx,
  removeColumn,
}: Props) => {
  const [value, setValue] = useState(colName);

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
        }}
        placeholder="Enter column name"
      />
      <div className={styles.closeBtn} onClick={() => removeColumn(idx)}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default InputWithCloseBtn;
