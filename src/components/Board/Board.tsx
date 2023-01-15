import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getBoards,
  getCurrentlySelected,
} from "../../features/boards/boardsSlice";
import Button from "../Button/Button";
import ColumnsDisplayer from "../ColumnsDisplayer/ColumnsDisplayer";
import styles from "./styles.module.css";

interface BoardProps {
  isSideBoardOpen: boolean;
}

const EmptyBoard = () => {
  return (
    <div className={styles.emptyBoardWrapper}>
      <p className={styles.emptyText}>
        This board is empty. Create a new column to get started.
      </p>
      <Button onClick={() => {}} text="+ Add New Column " />
    </div>
  );
};

const Board = ({ isSideBoardOpen }: BoardProps) => {
  const currentlySelected = useSelector(getCurrentlySelected);
  const columnAmountByThisBoard =
    useSelector(getBoards).byId[currentlySelected].columnIds.length;

  return (
    <main
      className={`${styles.main} ${isSideBoardOpen ? styles.sideOpen : ""}`}
    >
      <div className={`${styles.container}`}>
        <div className={`${styles.mainContent}`}>
          {columnAmountByThisBoard === 0 ? <EmptyBoard /> : <ColumnsDisplayer />}
        </div>
      </div>
    </main>
  );
};

export default Board;
