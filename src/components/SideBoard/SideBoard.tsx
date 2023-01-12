import SideBoardItem from "./SideBoardItem";
import styles from "./styles.module.css";
import SideBoardCreateItem from "./SideBoardCreateItem";
import SideBoardToggleWrapper from "../Toggle/SideBoardToggleWrapper";
import HideSidebar from "./HideSidebar";
import { ReactComponent as DarkLogo } from "../../assets/logo-dark.svg";

interface SideBoardProps {
  isOpen: boolean;
  closeSideBoard: () => void;
}

const SideBoard = ({ isOpen, closeSideBoard }: SideBoardProps) => {
  const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];

  return (
    <div
      className={`${styles.sideBoardWrapper} ${
        isOpen ? styles.sideBoardOpen : ""
      }`}
    >
      <div className={styles.sideBoardLogoWrapper}>
        <DarkLogo />
      </div>
      <p className={styles.allBoards}>ALL BOARDS (3)</p>
      {boards.map((el) => {
        let active: boolean;
        if (el.includes("f")) active = true;
        else active = false;
        return <SideBoardItem active={active} text={el} />;
      })}
      <SideBoardCreateItem />
      <SideBoardToggleWrapper />
      <HideSidebar onClick={closeSideBoard} />
    </div>
  );
};

export default SideBoard;
