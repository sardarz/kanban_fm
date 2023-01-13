import { useSelector } from "react-redux";
import { getBoards } from "../../features/boards/boardsSlice";
import ColumnDisplayer from "../ColumnDisplayer/ColumnDisplayer";
import styles from "./styles.module.css";

const NewColumn = () => {
  return (
    <div className={styles.newColumn}>
      <p>+ New Column</p>
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
