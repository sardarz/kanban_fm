import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as ThreeDots } from "../../../assets/icon-vertical-ellipsis.svg";
import {
  getBoards,
  getCurrentlySelected,
} from "../../../features/boards/boardsSlice";
import { getColumns } from "../../../features/columns/columnsSlice";
import Dropdown from "../../Dropdown/Dropdown";
import SubTaskViewer from "./SubTaskViewer";

const ViewTaskModal = () => {
  const currentlySelected = useSelector(getCurrentlySelected);
  const boards = useSelector(getBoards);
  const columnIds = boards.byId[currentlySelected].columnIds;
  const columns = useSelector(getColumns);
  const statuses = columnIds.map((id) => ({
    status: columns.byId[id].status,
    columnId: id,
  }));
  const [currentStatus, setCurrentStatus] = useState(0);

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

      <Dropdown
        statuses={statuses}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />
    </div>
  );
};

export default ViewTaskModal;
