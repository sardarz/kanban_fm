import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { modalTypes } from "../../common/utils/modalTypes";
import AddBoard from "./AddBoard/AddBoard";
import styles from "./styles.module.css";

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
        {type === modalTypes.addBoard ? <AddBoard /> : null}
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
