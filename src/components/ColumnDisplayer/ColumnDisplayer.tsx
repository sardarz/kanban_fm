import ColumnItem from "../ColumnItem/ColumnItem";
import styles from "./styles.module.css";

import { getColumns } from "../../features/columns/columnsSlice";
import { useAppSelector } from "../../app/hooks";

const ColumnDisplayer = ({ columnId }: { columnId: string }) => {
  const columns = useAppSelector(getColumns);
  const { taskIds, columnName } = columns?.byId[columnId] || {taskIds: [], columnName: ""}

  return (
    <div className={styles.wrapper}>
      <p className={styles.columnTitle}>
        {columnName} ({taskIds.length})
      </p>
      <div className={styles.columnDisplayer}>
        {taskIds.map((taskId) => (
          <ColumnItem key={taskId} taskId={taskId} />
        ))}
      </div>
    </div>
  );
};

export default ColumnDisplayer;
