import SideBoardItem from "./SideBoardItem";
import styles from "./styles.module.css";
import SideBoardCreateItem from "./SideBoardCreateItem";
import SideBoardToggleWrapper from "../Toggle/SideBoardToggleWrapper";
import HideSidebar from "./HideSidebar";
import { ReactComponent as DarkLogo } from "../../assets/logo-dark.svg";
import { getBoards } from "../../features/boards/boardsSlice";
import { useSelector } from "react-redux";

interface SideBoardProps {
  isOpen: boolean;
  closeSideBoard: () => void;
}

const SideBoard = ({ isOpen, closeSideBoard }: SideBoardProps) => {
  const boards = useSelector(getBoards);

  return (
    <div
      className={`${styles.sideBoardWrapper} ${
        isOpen ? styles.sideBoardOpen : ""
      }`}
    >
      <div className={styles.sideBoardLogoWrapper}>
        <DarkLogo />
      </div>
      <p className={styles.allBoards}>ALL BOARDS ({boards.allIds.length})</p>
      {boards.allIds.map((id) => {
        let active = false;
        if (boards.currentlySelected === id) active = true;
        return <SideBoardItem active={active} text={boards.byId[id].name} />;
      })}
      <SideBoardCreateItem />
      <SideBoardToggleWrapper />
      <HideSidebar onClick={closeSideBoard} />
    </div>
  );
};

export default SideBoard;
