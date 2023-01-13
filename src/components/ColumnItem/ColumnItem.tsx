import styles from "./styles.module.css";
import { ID } from "../../common/utils/types";
import { useSelector } from "react-redux";
import { getTaskById } from "../../features/tasks/tasksSlice";

const ColumnItem = ({ taskId, columnId }: { taskId: ID; columnId: ID }) => {
  const task = useSelector(getTaskById(taskId))
  return (
    <div className={styles.cardWrapper}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.subtasks}>0 of {task.subtasks.length} subtasks</p>
    </div>
  );
};

export default ColumnItem;
