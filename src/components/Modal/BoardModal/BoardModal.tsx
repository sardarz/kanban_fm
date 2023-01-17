import { useState } from "react";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { boardCreated, getBoards, getCurrentlySelected } from "../../../features/boards/boardsSlice";
import { addNewColumnsOnBoardCreation, getColumns } from "../../../features/columns/columnsSlice";

const AddBoard = ({
  isNewBoard,
  closeModal,
}: {
  isNewBoard: boolean;
  closeModal?: () => void;
}) => {
  const dispatch = useDispatch();
  
  
  const [boardTitle, setBoardTitle] = useState("")
  const [columns, setColumns] = useState([
    { status: "Todo", columnId: uuidv4() },
    { status: "Doing", columnId: uuidv4() },
  ]);

  const updateColumnText = (idx: number, v: string) => {
    const temp = columns.slice();
    temp[idx].status = v;
    setColumns(temp);
  };

  const removeColumnText = (idx: number) => {
    const newColumns = columns.slice();
    newColumns.splice(idx, 1);
    setColumns(newColumns);
  };

  const onCreateNewBoard = () => {
    dispatch(
      boardCreated({ name: boardTitle, columnIds: columns.map((el) => el.columnId) })
    );
    dispatch(addNewColumnsOnBoardCreation(columns));
    if (closeModal) closeModal();
  };

  
  return (
    <div className="modalBox">
      <h3 className="title">{isNewBoard ? "Add New Board" : "Edit Board"}</h3>

      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
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

      <div className="columnsWrapper">
        <p className="subTitle">{!isNewBoard && "Board "}Columns</p>
        <div className="columns">
          {columns.map((col, idx) => (
            <InputWithCloseBtn
              onClick={() => removeColumnText(idx)}
              key={col.columnId}
              placeholder="Enter column name"
              updateGivenText={updateColumnText}
              idx={idx}
              colName={col.status}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="secondary"
        onClick={() => {
          setColumns([...columns, { status: "", columnId: uuidv4()}]);
        }}
      >
        + Add New Column
      </button>
      <button type="button" className="primary" onClick={onCreateNewBoard}>
        {isNewBoard ? "Create New Board" : "Save Changes"}
      </button>
    </div>
  );
};

export default AddBoard;
