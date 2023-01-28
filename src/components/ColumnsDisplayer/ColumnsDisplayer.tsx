import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addNewColumnToCurrentlySelected,
  getBoards,
} from "../../features/boards/boardsSlice";
import ColumnDisplayer from "../ColumnDisplayer/ColumnDisplayer";
import styles from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";
import { createNewColumnById } from "../../features/columns/columnsSlice";

const NewColumn = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.newColumn}>
      <p
        onClick={() => {
          const id = uuidv4();
          dispatch(addNewColumnToCurrentlySelected(id));
          dispatch(createNewColumnById(id));
        }}
      >
        + New Column
      </p>
    </div>
  );
};

const ColumnsDisplayer = () => {
  const currentlySelected = useAppSelector(getBoards).currentlySelected;
  const currentBoardColumns =
    useAppSelector(getBoards).byId[currentlySelected].columnIds;

  return (
    <div className={styles.columnsDisplayer}>
      {currentBoardColumns.map((column) => (
        <ColumnDisplayer columnId={column} key={column} />
      ))}
      <NewColumn />
    </div>
  );
};

export default ColumnsDisplayer;
