import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";

const AddBoard = ({ isNewBoard, closeModal }: { isNewBoard: boolean, closeModal?: () => void }) => {
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
          {/* <InputWithCloseBtn placeholder="ke" onClick={() => {}} />
          <InputWithCloseBtn placeholder="lol" onClick={() => {}} /> */}
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
