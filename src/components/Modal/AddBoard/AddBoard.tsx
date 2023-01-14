import modalStyles from "./addBoard.module.css";
import styles from "../styles.module.css";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";

const AddBoard = () => {
  return (
    <div className="modalBox">
      <h3 className="title">Add New Board</h3>

      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
          Name
        </label>
        <input type="text" id="boardName" placeholder="e.g. Web Design" />
      </div>

      <div className="columnsWrapper">
        <p className="subTitle">Columns</p>
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
