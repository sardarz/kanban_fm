import { useState } from "react";
import { modalTypes } from "../../common/utils/modalTypes";
import Modal from "../Modal/Modal";
import styles from "./styles.module.css";

interface Props {
  type: string;
  isThreeDotsOpen: boolean;
  setIsThreeDotsOpen: (v: boolean) => void;
}

const ThreeDotsMenu = ({
  type,
  isThreeDotsOpen,
  setIsThreeDotsOpen,
}: Props) => {
  const text = type === "board" ? "board" : "task";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

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
      <p className={styles.delete}>Delete {text}</p>
      {isModalOpen && (
        <Modal type={modalTypes.editBoard} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ThreeDotsMenu;
