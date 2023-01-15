import { useState } from "react";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { boardCreated } from "../../../features/boards/boardsSlice";
import { addNewColumnsOnBoardCreation } from "../../../features/columns/columnsSlice";

const AddBoard = ({
  isNewBoard,
  closeModal,
}: {
  isNewBoard: boolean;
  closeModal?: () => void;
}) => {
  const dispatch = useDispatch();
  const [boardTitle, setBoardTitle] = useState("");
  const [columns, setColumns] = useState([
    { value: "Todo", id: uuidv4() },
    { value: "Doing", id: uuidv4() },
  ]);

  const updateColumnText = (idx: number, v: string) => {
    const temp = columns.slice();
    temp[idx].value = v;
    setColumns(temp);
  };

  const removeColumnText = (idx: number) => {
    const newColumns = columns.slice();
    newColumns.splice(idx, 1);
    setColumns(newColumns);
  };

  const onCreateNewBoard = () => {
    dispatch(
      boardCreated({ name: boardTitle, columnIds: columns.map((el) => el.id) })
    );
    dispatch(addNewColumnsOnBoardCreation(columns));
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
              key={col.id}
              placeholder="Enter column name"
              updateGivenText={updateColumnText}
              idx={idx}
              colName={col.value}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="secondary"
        onClick={() => {
          setColumns([...columns, { value: "", id: uuidv4() }]);
        }}
      >
        + Add New Column
      </button>
      <button type="button" className="primary" onClick={onCreateNewBoard}>
        Create New Board
      </button>
    </div>
  );
};

export default AddBoard;
