import { useState } from "react";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  boardCreated,
  boardEdited,
  getBoards,
  getCurrentlySelected,
} from "../../../features/boards/boardsSlice";
import {
  addNewColumns,
  addNewColumnsOnBoardCreation,
  getColumns,
  removeOldColumns,
} from "../../../features/columns/columnsSlice";
import { removeOldTasksOnBoardEdit } from "../../../features/tasks/tasksSlice";
import styles from "../styles.module.css";
import Button from "../../Button/Button";

const AddBoard = ({
  isNewBoard,
  closeModal,
}: {
  isNewBoard: boolean;
  closeModal?: () => void;
}) => {
  const dispatch = useDispatch();

  const currentlySelected = useSelector(getCurrentlySelected);
  const boards = useSelector(getBoards);
  const allColumns = useSelector(getColumns);

  const currentBoard = isNewBoard
    ? {
        boardId: uuidv4(),
        name: "",
        columnIds: [],
      }
    : boards.byId[currentlySelected];
  const boardsColumns = currentBoard.columnIds.map((c) => allColumns.byId[c]);

  const [boardTitle, setBoardTitle] = useState(currentBoard.name);
  const [columns, setColumns] = useState(
    isNewBoard
      ? [
          { columnName: "Todo", columnId: uuidv4(), taskIds: [] },
          { columnName: "Doing", columnId: uuidv4(), taskIds: [] },
        ]
      : boardsColumns
  );

  const [canCreateOrUpdateComponent, setCanCreateOrUpdateComponent] =
    useState(true);

  const updateColumnText = (idx: number, v: string) => {
    const temp = columns.map((col) => {
      return {
        columnId: col.columnId,
        columnName: col.columnName,
        taskIds: col.taskIds.slice(),
      };
    });
    temp[idx].columnName = v;
    setColumns(temp);
  };

  const [idsOfRemovedColumns, setIdsOfRemovedColumns] = useState<string[]>([]);

  const removeColumn = (idx: number) => {
    const temp = columns.map((col, index) => {
      const column = {
        columnId: col.columnId,
        columnName: col.columnName,
        taskIds: col.taskIds.slice(),
      };
      if (idx === index) {
        setIdsOfRemovedColumns([...idsOfRemovedColumns, columns[idx].columnId]);
        column.columnId = "";
      }
      return column;
    });
    setColumns(temp.filter((el) => el.columnId.length));
  };

  const componentHasEmptyField = () => {
    const hasEmptyColumn = columns.find((el) => el.columnName.length === 0);
    if (!boardTitle.length || hasEmptyColumn) return true;
    return false;
  };

  const onCreateNewBoard = () => {
    if (componentHasEmptyField()) {
      setCanCreateOrUpdateComponent(false);
      return;
    }
    dispatch(
      boardCreated({
        name: boardTitle,
        columnIds: columns.map((el) => el.columnId),
        id: uuidv4(),
      })
    );
    dispatch(addNewColumnsOnBoardCreation(columns));
    if (closeModal) closeModal();
  };

  const onSaveBoard = () => {
    if (componentHasEmptyField()) {
      setCanCreateOrUpdateComponent(false);
      return;
    }
    const newColumns = columns.filter((col) => {
      return !idsOfRemovedColumns.includes(col.columnId);
    });

    const idsOfRemovedTasks = boardsColumns
      .map((col) => {
        if (idsOfRemovedColumns.includes(col.columnId)) {
          return col.taskIds;
        } else return [];
      })
      .flat();

    dispatch(removeOldTasksOnBoardEdit(idsOfRemovedTasks));
    dispatch(removeOldColumns(idsOfRemovedColumns));
    dispatch(addNewColumns(newColumns));
    dispatch(
      boardEdited({
        name: boardTitle,
        id: currentlySelected,
        columnIds: newColumns.map((el) => el.columnId),
      })
    );

    if (closeModal) closeModal();
  };

  return (
    <div
      className={`${styles.modalBox} ${
        !canCreateOrUpdateComponent && !boardTitle.length
          ? styles.cannotCreateOrUpdateComponent
          : ""
      }`}
    >
      <h3 className={`${styles.title}`}>
        {isNewBoard ? "Add New Board" : "Edit Board"}
      </h3>

      <div
        className={`${styles.inputWrapper} ${
          boardTitle.length === 0 && !canCreateOrUpdateComponent
            ? styles.emptyInputTitle
            : ""
        }`}
      >
        <label htmlFor="boardName" className={`${styles.subtitle}`}>
          {!isNewBoard && "Board "}Name
        </label>
        <input
          type="text"
          id="boardName"
          placeholder="e.g. Web Design"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
      </div>

      <div className={`${styles.columnsWrapper}`}>
        <p className={`${styles.subtitle}`}>{!isNewBoard && "Board "}Columns</p>
        <div className={`${styles.columns}`}>
          {columns.map((col, idx) => (
            <InputWithCloseBtn
              onClick={() => removeColumn(idx)}
              key={col.columnId}
              updateGivenText={updateColumnText}
              idx={idx}
              type="board"
              title={col.columnName}
              shouldShowWarning={!canCreateOrUpdateComponent}
            />
          ))}
        </div>
      </div>

      <Button
        typeOfBtn="modalSecondary"
        onClick={() => {
          setColumns([
            ...columns,
            { columnName: "", columnId: uuidv4(), taskIds: [] },
          ]);
        }}
        text="+ Add New Column"
      />
      <Button
        typeOfBtn="modalPrimary"
        onClick={isNewBoard ? onCreateNewBoard : onSaveBoard}
        text={isNewBoard ? "Create New Board" : "Save Changes"}
      />
    </div>
  );
};

export default AddBoard;
