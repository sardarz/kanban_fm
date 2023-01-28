import { ReactComponent as DarkLogo } from "../../assets/logo-dark.svg";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { ReactComponent as HeaderMenuLogo } from "../../assets/icon-vertical-ellipsis.svg";
import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { modalTypes } from "../../common/utils/modalTypes";
import { ReactComponent as MobileLogo } from "../../assets/logo-mobile.svg";
import { ReactComponent as IconDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as IconUp } from "../../assets/icon-chevron-up.svg";
import { useAppSelector } from "../../app/hooks";

const Header = ({
  isSideBoardOpen,
  isThreeDotsOpen,
  setIsThreeDotsOpen,
  setIsSideBoardOpen,
}: {
  isSideBoardOpen: boolean;
  isThreeDotsOpen: boolean;
  setIsThreeDotsOpen: (v: boolean) => void;
  setIsSideBoardOpen: (v: boolean) => void;
}) => {
  const boardTitle = useAppSelector(
    (state) =>
      state.boards.byId[state.boards.currentlySelected]?.name ||
      "Need to create a board"
  );
  const currentlySelected = useAppSelector(
    (state) => state.boards.currentlySelected
  );
  const columnCount = useAppSelector(
    (state) =>
      state.boards.byId[state.boards.currentlySelected]?.columnIds?.length
  );
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const closeAddTaskOpen = () => setIsAddTaskOpen(false);

  const bodyWidth = document.body.clientWidth;

  return (
    <div
      className={`${styles.headerWrapper} ${
        isSideBoardOpen ? styles.sideOpen : ""
      }`}
      onResize={(e) => {
        console.log("kek");
        console.log(e.target);
      }}
    >
      <div className={styles.headerLogoWrapper}>
        <DarkLogo />
      </div>
      <div className={styles.mobileHeaderLogoWrapper}>
        <MobileLogo />
      </div>
      <div className={`${styles.headerMainWrapper} `}>
        <div
          className={`${styles.headerTitleWrapper}`}
          onClick={(e) => {
            e.stopPropagation();
            if (bodyWidth < 700) setIsSideBoardOpen(!isSideBoardOpen);
          }}
        >
          <h1>{boardTitle}</h1>
          <div
            className={`${styles.chevronWrapper} ${
              isSideBoardOpen ? styles.sideOpen : ""
            }`}
          >
            <div className={`${styles.chevronUp}`}>
              <IconUp />
            </div>
            <div className={`${styles.chevronDown}`}>
              <IconDown />
            </div>
          </div>
        </div>
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
            isDisabled={columnCount === 0 || currentlySelected === ""}
          />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsThreeDotsOpen(true);
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
