import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { modalTypes } from "../../common/utils/modalTypes";
import BoardModal from "./BoardModal/BoardModal";
import styles from "./styles.module.css";
import TaskModal from "./TaskModal/TaskModal";

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
    <div className={`${styles.modalWrapper}`} onClick={closeModal}>
      <div
        className={`${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        {type === modalTypes.addBoard ? <TaskModal /> : null}
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
