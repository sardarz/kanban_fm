import { useState } from "react";
import { modalTypes } from "../../common/utils/modalTypes";
import { ITask } from "../../features/tasks/tasksSlice";
import Modal from "../Modal/Modal";
import styles from "./styles.module.css";

interface Props {
  type: string;
  isThreeDotsOpen: boolean;
  setIsThreeDotsOpen: (v: boolean) => void;
  task?: ITask;
}

const ThreeDotsMenu = ({
  type,
  isThreeDotsOpen,
  setIsThreeDotsOpen,
  task,
}: Props) => {
  const text = type === "board" ? "board" : "task";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div
      className={`${styles.wrapper} ${isThreeDotsOpen ? styles.isOpen : ""}`}
    >
      <p
        onClick={(e) => {
          e.stopPropagation();
          setIsThreeDotsOpen(false);
          setIsModalOpen(true);
        }}
        className={styles.edit}
      >
        Edit {text}
      </p>
      <p
        className={styles.delete}
        onClick={() => {
          setIsDeleteModalOpen(true);
        }}
      >
        Delete {text}
      </p>
      {isDeleteModalOpen && (
        <Modal
          type={
            type === "board" ? modalTypes.deleteBoard : modalTypes.deleteTask
          }
          task={task}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isModalOpen && (
        <Modal
          type={type === "board" ? modalTypes.editBoard : modalTypes.editTask}
          closeModal={closeModal}
          task={task}
        />
      )}
    </div>
  );
};

export default ThreeDotsMenu;
