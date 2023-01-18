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
  closeParentModal?: () => void;
}

const ThreeDotsMenu = ({
  type,
  isThreeDotsOpen,
  setIsThreeDotsOpen,
  task,
  closeParentModal,
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
          setIsModalOpen(true);
          setIsThreeDotsOpen(false);
        }}
        className={styles.edit}
      >
        Edit {text}
      </p>
      <p
        className={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteModalOpen(true);
          setIsThreeDotsOpen(false);
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
          closeModal={() => {
            setIsThreeDotsOpen(false);
            setIsDeleteModalOpen(false);
            closeModal();
          }}
        />
      )}
      {isModalOpen && (
        <Modal
          type={type === "board" ? modalTypes.editBoard : modalTypes.editTask}
          closeModal={() => {
            setIsThreeDotsOpen(false);
            setIsDeleteModalOpen(false);
            if (closeParentModal) closeParentModal();
            closeModal();
          }}
          task={task}
        />
      )}
    </div>
  );
};

export default ThreeDotsMenu;
