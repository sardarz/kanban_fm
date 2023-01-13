import ColumnItem from "../ColumnItem/ColumnItem";
import styles from "./styles.module.css";

const ColumnDisplayer = () => {
  const columnItems = [1, 2, 3, 4,];

  return (
    <div className={styles.wrapper}>
      <p className={styles.columnTitle}>TODO (4)</p>
      <div className={styles.columnDisplayer}>
        {columnItems.map((c) => (
          <ColumnItem />
        ))}
      </div>
    </div>
  );
};

export default ColumnDisplayer;
