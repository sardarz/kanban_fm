import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";
import { useState } from "react";

const AddBoard = () => {
  const [isNewBoard, setIsNewBoard] = useState(true);
  return (
    <div className="modalBox">
      <h3 className="title">{isNewBoard ? "Add New Board" : "Edit Board"}</h3>

      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
          {!isNewBoard && "Board "}Name
        </label>
        <input type="text" id="boardName" placeholder="e.g. Web Design" />
      </div>

      <div className="columnsWrapper">
        <p className="subTitle">{!isNewBoard && "Board "}Columns</p>
        <div className="columns">
          <InputWithCloseBtn />
          <InputWithCloseBtn />
        </div>
      </div>

      <button type="button" className="secondary">
        + Add New Column
      </button>
      <button type="button" className="primary">
        Create New Board
      </button>
    </div>
  );
};

export default AddBoard;
