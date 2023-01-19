import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalTypes } from "../../common/utils/modalTypes";
import {
  addNewColumnToCurrentlySelected,
  getBoards,
  getCurrentlySelected,
} from "../../features/boards/boardsSlice";
import Button from "../Button/Button";
import ColumnsDisplayer from "../ColumnsDisplayer/ColumnsDisplayer";
import Modal from "../Modal/Modal";
import styles from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";
import { createNewColumnById } from "../../features/columns/columnsSlice";

interface BoardProps {
  isSideBoardOpen: boolean;
}

const EmptyBoard = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.emptyBoardWrapper}>
      <p className={styles.emptyText}>
        This board is empty. Create a new column to get started.
      </p>
      <Button
        typeOfBtn="primary"
        onClick={() => {
          const id = uuidv4();
          dispatch(addNewColumnToCurrentlySelected(id));
          dispatch(createNewColumnById(id));
        }}
        text="+ Add New Column "
      />
    </div>
  );
};

const CreateBoard = () => {
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const closeModal = () => setIsAddBoardOpen(false);

  return (
    <div className={styles.emptyBoardWrapper}>
      <p className={styles.emptyText}>
        There is no board available. You need to create a board before using the
        app.
      </p>
      <Button
        typeOfBtn="primary"
        onClick={() => {
          setIsAddBoardOpen(true);
        }}
        text="Create a new Board"
      />
      {isAddBoardOpen && (
        <Modal closeModal={closeModal} type={modalTypes.addBoard} />
      )}
    </div>
  );
};

const displayByColumnAmount = (columnAmount: number) => {
  if (columnAmount === 0) return <EmptyBoard />;
  return <ColumnsDisplayer />;
};

const Board = ({ isSideBoardOpen }: BoardProps) => {
  const currentlySelected = useSelector(getCurrentlySelected);
  const columnAmountByThisBoard =
    useSelector(getBoards).byId[currentlySelected]?.columnIds?.length;

  return (
    <main
      className={`${styles.main} ${isSideBoardOpen ? styles.sideOpen : ""}`}
    >
      <div className={`${styles.container}`}>
        <div className={`${styles.mainContent}`}>
          {currentlySelected !== "" ? (
            displayByColumnAmount(columnAmountByThisBoard)
          ) : (
            <CreateBoard />
          )}
        </div>
      </div>
    </main>
  );
};

export default Board;
