import { useState } from "react";
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
      <Button text="+ Add New Column " />
    </div>
  );
};

const Board = ({ isSideBoardOpen }: BoardProps) => {
  const [isBoardEmpty, setIsBoardEmpty] = useState(false);

  return (
    <main
      className={`${styles.main} ${isSideBoardOpen ? styles.sideOpen : ""}`}
    >
      <div className={`${styles.container}`}>
        <div className={`${styles.mainContent}`}>
          {isBoardEmpty ? <EmptyBoard /> : <ColumnsDisplayer />}
        </div>
      </div>
    </main>
  );
};

export default Board;
