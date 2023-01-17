import { useState } from "react";
import InputWithCloseBtn from "./InputForEditBoard/InputWithCloseBtn";
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
  const currentBoard = boards.byId[currentlySelected];
  const allColumns = useSelector(getColumns);
  const boardsColumns = currentBoard.columnIds.map((c) => allColumns.byId[c]);

  const [boardTitle, setBoardTitle] = useState(
    isNewBoard ? "" : currentBoard.name
  );
  const [columns, setColumns] = useState(boardsColumns);

  const updateColumnText = (idx: number, v: string) => {
    const temp = columns.map((col) => {
      return {
        columnId: col.columnId,
        status: col.status,
        taskIds: col.taskIds.slice(),
      };
    });
    temp[idx].status = v;
    setColumns(temp);
  };

  const [idsOfRemovedColumns, setIdsOfRemovedColumns] = useState<
    (string | undefined)[]
  >([]);

  const removeColumn = (idx: number) => {
    console.log('kke', columns)
    const temp = columns.map((col, index) => {
      if (idx === index) {
        setIdsOfRemovedColumns([
          ...idsOfRemovedColumns,
          columns[idx]?.columnId,
        ]);
        return null;
      } else
        return {
          columnId: col.columnId,
          status: col.status,
          taskIds: col.taskIds.slice(),
        };
    });
    setColumns(temp.filter((el) => el) as typeof columns);
  };

  const onSaveBoard = () => {
    const newColumns = columns.filter(col => {
      return !idsOfRemovedColumns.includes(col.columnId)
    })

    const idsOfRemovedTasks = boardsColumns.map(col => {
      if (idsOfRemovedColumns.includes(col.columnId)) {
        return col.taskIds
      } else return []
    }).flat()

    dispatch(removeOldTasksOnBoardEdit(idsOfRemovedTasks as string[]))
    dispatch(removeOldColumns(idsOfRemovedColumns as string[]))
    dispatch(addNewColumns(newColumns))
    dispatch(
      boardEdited({
        name: boardTitle,
        id: currentlySelected,
        columnIds: newColumns.map((el) => el.columnId),
      })
    );

    if (closeModal) closeModal()
  };

  return (
    <div className="modalBox">
      <h3 className="title">{"Edit Board"}</h3>

      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
          {"Board "}Name
        </label>
        <input
          type="text"
          id="boardName"
          placeholder="e.g. Web Design"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
      </div>

      <div className="columnsWrapper">
        <p className="subTitle">{"Board "}Columns</p>
        <div className="columns">
          {columns.map((col, idx) => (
            <InputWithCloseBtn
              colName={col.status}
              updateGivenText={updateColumnText}
              idx={idx}
              key={col.columnId}
              removeColumn={removeColumn}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="secondary"
        onClick={() => {
          setColumns([
            ...columns,
            { status: "", columnId: uuidv4(), taskIds: [] },
          ]);
        }}
      >
        + Add New Column
      </button>
      <button type="button" className="primary" onClick={onSaveBoard}>
        {"Save Changes"}
      </button>
    </div>
  );
};

export default AddBoard;
