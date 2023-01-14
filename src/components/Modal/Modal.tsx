import { useMemo } from "react";
import { createPortal } from "react-dom";
import { modalTypes } from "../../common/utils/modalTypes";
import AddModal from "./AddModal/AddModal";
import styles from "./styles.module.css";

interface ModalProps {
  type: string;
}

interface ModalWrapperProps {
  type: string;
}

const ModalWrapper = ({ type }: ModalWrapperProps) => {
  return (
    <div className={`${styles.modalWrapper}`}>
      <div className={`${styles.modalContent}`}>
        {type === modalTypes.addBoard ? <AddModal /> : null}
      </div>
    </div>
  );
};

const Modal = ({ type }: ModalProps) => {
  const containerElement = useMemo(
    () => document.getElementById("modal-container") as HTMLElement,
    []
  );

  return createPortal(<ModalWrapper type={type} />, containerElement);
};

export default Modal;
