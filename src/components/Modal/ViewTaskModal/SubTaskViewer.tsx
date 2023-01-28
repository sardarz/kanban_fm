import { useAppDispatch } from "../../../app/hooks";
import { ReactComponent as Check } from "../../../assets/icon-check.svg";
import { updateSubtaskStatus } from "../../../features/tasks/tasksSlice";
import styles from "./subtask.module.css";

const CheckBox = ({ isDone }: { isDone: boolean }) => {
  return (
    <div className={`${styles.checkboxWrapper} `}>{isDone && <Check />}</div>
  );
};

const SubTaskViewer = ({
  isDone,
  subtaskText,
  idx,
  taskId,
}: {
  isDone: boolean;
  subtaskText: string;
  idx: number;
  taskId: string;
}) => {
  const dispatch = useAppDispatch()

  return (
    <div
      className={`${styles.subtask} ${isDone ? styles.isDone : ""}`}
      onClick={() => {
        dispatch(updateSubtaskStatus({idx, taskId}))
      }}
    >
      <CheckBox isDone={isDone} />
      <p>{subtaskText}</p>
    </div>
  );
};

export default SubTaskViewer;
