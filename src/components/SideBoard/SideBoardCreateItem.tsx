import styles from "./styles.module.css";
import SideBoardLogo from "./SideBoardLogo";
import Modal from "../Modal/Modal";
import { modalTypes } from "../../common/utils/modalTypes";
import { useState } from "react";

const SideBoardCreateItem = () => {
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

  const closeModal = () => setIsAddBoardOpen(false);

  return (
    <div className={`${styles.sideBoardItemWrapper} ${styles.createItem}`}>
      {isAddBoardOpen && <Modal closeModal={closeModal} type={modalTypes.addBoard} />}
      <SideBoardLogo />
      <p onClick={() => setIsAddBoardOpen(true)} className={styles.button}>+ Create New Board</p>
    </div>
  );
};

export default SideBoardCreateItem;
