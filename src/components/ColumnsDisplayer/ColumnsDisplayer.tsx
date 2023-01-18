import { useDispatch, useSelector } from "react-redux";
import { addNewColumnToCurrentlySelected, getBoards } from "../../features/boards/boardsSlice";
import ColumnDisplayer from "../ColumnDisplayer/ColumnDisplayer";
import styles from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";
import { createNewColumnById } from "../../features/columns/columnsSlice";

const NewColumn = () => {
  const dispatch = useDispatch();
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
  const currentlySelected = useSelector(getBoards).currentlySelected;
  const currentBoardColumns =
    useSelector(getBoards).byId[currentlySelected].columnIds;

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
