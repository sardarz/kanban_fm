import SideBoardItem from "./SideBoardItem";
import styles from "./styles.module.css";
import SideBoardCreateItem from "./SideBoardCreateItem";
import SideBoardToggleWrapper from "./SideBoardToggleWrapper";

const SideBoard = () => {
  const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];

  return (
    <div className={`${styles.sideBoardWrapper}`}>
      {boards.map((el) => {
        let active: boolean;
        if (el.includes("f")) active = true;
        else active = false;
        return <SideBoardItem active={active} text={el} />;
      })}
      <SideBoardCreateItem />
      <SideBoardToggleWrapper />
    </div>
  );
};

export default SideBoard;
