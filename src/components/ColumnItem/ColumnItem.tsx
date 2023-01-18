import styles from "./styles.module.css";

import { useSelector } from "react-redux";
import { getTaskById } from "../../features/tasks/tasksSlice";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { modalTypes } from "../../common/utils/modalTypes";

const ColumnItem = ({ taskId }: { taskId: string }) => {
  const task = useSelector(getTaskById(taskId));
  const completedTaskAmount = task.subtasks.filter(
    (el) => el.isCompleted
  ).length;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.cardWrapper} onClick={() => setIsModalOpen(true)}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.subtasks}>
        {completedTaskAmount} of {task.subtasks.length} subtasks
      </p>

      {isModalOpen && (
        <Modal
          taskId={taskId}
          type={modalTypes.viewTask}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ColumnItem;
