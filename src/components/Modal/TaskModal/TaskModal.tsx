import { useState } from "react";
import InputWithCloseBtn from "../InputWithCloseBtn/InputWithCloseBtn";

const TaskModal = () => {
  const [isNewTask, setIsNewTask] = useState(true);
  return (
    <div className="modalBox">
      <h3 className="title"> {isNewTask ? "Add New " : "Edit "} Task</h3>

      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
          Title
        </label>
        <input
          type="text"
          id="boardName"
          placeholder="e.g. Web Design"
          value="Add authentication endpoints"
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="boardName" className="subTitle">
          Description
        </label>
        <textarea rows={4} placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."></textarea>
      </div>

      <div className="columnsWrapper">
        <p className="subTitle">Subtasks</p>
        <div className="columns">
          <InputWithCloseBtn />
          <InputWithCloseBtn />
        </div>
      </div>

      <button type="button" className="secondary">
        + Add New Subtask
      </button>

      <p>status</p>

      <button type="button" className="primary">
        Create New Board
      </button>
    </div>
  );
};

export default TaskModal;
