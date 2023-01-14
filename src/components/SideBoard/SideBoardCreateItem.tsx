import styles from "./styles.module.css";
import SideBoardLogo from "./SideBoardLogo";
import Modal from "../Modal/Modal";
import { modalTypes } from "../../common/utils/modalTypes";

const SideBoardCreateItem = () => {
  return (
    <div className={`${styles.sideBoardItemWrapper} ${styles.createItem}`}>
      <Modal type={modalTypes.addBoard}/>
      <SideBoardLogo />
      <p className={styles.button}>+ Create New Board</p>
    </div>
  );
};

export default SideBoardCreateItem;
