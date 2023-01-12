import SideBoardItem from "./SideBoardItem";
import styles from "./styles.module.css";
import SideBoardCreateItem from "./SideBoardCreateItem";
import SideBoardToggleWrapper from "../Toggle/SideBoardToggleWrapper";
import HideSidebar from "./HideSidebar";
import {ReactComponent as LightLogo} from "../../assets/logo-dark.svg"

const SideBoard = () => {
  const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];

  return (
    <div className={`${styles.sideBoardWrapper}`}>
      <div className={styles.sideBoardLogoWrapper}>
        <LightLogo />
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
      <HideSidebar />
    </div>
  );
};

export default SideBoard;