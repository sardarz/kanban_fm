import ColumnItem from "../ColumnItem/ColumnItem";
import styles from "./styles.module.css";
 
import { getColumns } from "../../features/columns/columnsSlice";
import { useSelector } from "react-redux";

const ColumnDisplayer = ({ columnId }: { columnId: string }) => {
  const columns = useSelector(getColumns);
  const { taskIds, status } = columns.byId[columnId];
  
  return (
    <div className={styles.wrapper}>
      <p className={styles.columnTitle}>
        {status} ({taskIds.length})
      </p>
      <div className={styles.columnDisplayer}>
        {taskIds.map((taskId) => (
          <ColumnItem key={taskId} columnId={columnId} taskId={taskId} />
        ))}
      </div>
    </div>
  );
};

export default ColumnDisplayer;
