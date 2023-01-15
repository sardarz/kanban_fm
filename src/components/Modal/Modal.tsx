import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { modalTypes } from "../../common/utils/modalTypes";
import BoardModal from "./BoardModal/BoardModal";
import EditBoard from "./BoardModal/EditBoard";
import DeleteModal from "./DeleteModal/DeleteModal";
import styles from "./styles.module.css";
import TaskModal from "./TaskModal/TaskModal";
import ViewTaskModal from "./ViewTaskModal/ViewTaskModal";

interface ModalProps {
  type: string;
  closeModal: () => void;
}

interface ModalWrapperProps {
  type: string;
  closeModal: () => void;
}

const ModalWrapper = ({ type, closeModal }: ModalWrapperProps) => {
  return (
    <div
      onClick={(e) => {
        if (type === modalTypes.editBoard) e.stopPropagation();
        closeModal();
      }}
      className={`${styles.modalWrapper}`}
    >
      <div
        className={`${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        {type === modalTypes.addBoard ? (
          <BoardModal isNewBoard={true} closeModal={closeModal} />
        ) : type === modalTypes.editBoard ? (
          <EditBoard isNewBoard={false} closeModal={closeModal} />
        ) : type === modalTypes.addTask ? (
          <TaskModal isNewTask={true} closeModal={closeModal} />
        ) : type === modalTypes.editTask ? (
          <TaskModal isNewTask={false} />
        ) : type === modalTypes.viewTask ? (
          <ViewTaskModal />
        ) : type === modalTypes.deleteBoard ? (
          <DeleteModal type="board" />
        ) : type === modalTypes.deleteTask ? (
          <DeleteModal type="task" />
        ) : null}
      </div>
    </div>
  );
};

const Modal = ({ type, closeModal }: ModalProps) => {
  const containerElement = useMemo(
    () => document.getElementById("modal-container") as HTMLElement,
    []
  );

  return createPortal(
    <ModalWrapper closeModal={closeModal} type={type} />,
    containerElement
  );
};

export default Modal;
