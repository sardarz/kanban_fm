import { ReactComponent as ThreeDots } from "../../../assets/icon-vertical-ellipsis.svg";
import Dropdown from "../../Dropdown/Dropdown";
import SubTaskViewer from "./SubTaskViewer";

const ViewTaskModal = () => {
  const title =
    "Research pricing points of various competitors and trial different business models";

  const description =
    "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.";

  return (
    <div className="modalBox">
      <div className="viewTaskHeader">
        <h3 className="title">{title}</h3>
        <div className="threeDots">
          <ThreeDots />
        </div>
      </div>
      <p className="description">{description}</p>

      <div className="subtasksWrapper">
        <p className="subTitle">Subtasks (2 of 3)</p>
        <div className="subtasks">
          <SubTaskViewer />
          <SubTaskViewer />
          <SubTaskViewer />
        </div>
      </div>

      <Dropdown />
    </div>
  );
};

export default ViewTaskModal;
