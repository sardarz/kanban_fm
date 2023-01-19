import { ReactComponent as DarkLogo } from "../../assets/logo-dark.svg";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { ReactComponent as HeaderMenuLogo } from "../../assets/icon-vertical-ellipsis.svg";
import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { modalTypes } from "../../common/utils/modalTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Header = ({
  isSideBoardOpen,
  isThreeDotsOpen,
  setIsThreeDotsOpen,
}: {
  isSideBoardOpen: boolean;
  isThreeDotsOpen: boolean;
  setIsThreeDotsOpen: (v: boolean) => void;
}) => {
  const boardTitle = useSelector(
    (state: RootState) =>
      state.boards.byId[state.boards.currentlySelected]?.name ||
      "Need to create a board"
  );
  const columnCount = useSelector(
    (state: RootState) =>
      state.boards.byId[state.boards.currentlySelected].columnIds.length
  );
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const closeAddTaskOpen = () => setIsAddTaskOpen(false);

  return (
    <div
      className={`${styles.headerWrapper} ${
        isSideBoardOpen ? styles.sideOpen : ""
      }`}
    >
      <div className={styles.headerLogoWrapper}>
        <DarkLogo />
      </div>
      <div className={`${styles.headerMainWrapper} `}>
        <h1>{boardTitle}</h1>
        <div
          className={styles.buttonHeaderWrapper}
          style={{ maxWidth: "164px" }}
        >
          <Button
            typeOfBtn="primary"
            text="+ Add New Task"
            onClick={() => {
              setIsAddTaskOpen(true);
            }}
            isDisabled={columnCount === 0}
          />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsThreeDotsOpen(!isThreeDotsOpen);
          }}
          className={styles.headerMenuLogoWrapper}
        >
          <HeaderMenuLogo />
          <ThreeDotsMenu
            setIsThreeDotsOpen={setIsThreeDotsOpen}
            isThreeDotsOpen={isThreeDotsOpen}
            type="board"
          />
        </div>
      </div>
      {isAddTaskOpen && (
        <Modal type={modalTypes.addTask} closeModal={closeAddTaskOpen} />
      )}
    </div>
  );
};

export default Header;
