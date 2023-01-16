import styles from "./styles.module.css";
import { ID } from "../../common/utils/types";
import { useSelector } from "react-redux";
import { getTaskById } from "../../features/tasks/tasksSlice";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { modalTypes } from "../../common/utils/modalTypes";

const ColumnItem = ({ taskId, columnId }: { taskId: ID; columnId: ID }) => {
  const task = useSelector(getTaskById(taskId));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.cardWrapper} onClick={() => setIsModalOpen(true)}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.subtasks}>0 of {task.subtasks.length} subtasks</p>
  
      {isModalOpen && (
        <Modal
          taskId={taskId as string}
          type={modalTypes.viewTask}
          closeModal={closeModal}
          columnId={columnId as string}
        />
      )}
    </div>
  );
};

export default ColumnItem;
