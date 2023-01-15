import { ReactComponent as DarkLogo } from "../../assets/logo-dark.svg";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { ReactComponent as HeaderMenuLogo } from "../../assets/icon-vertical-ellipsis.svg";
import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { modalTypes } from "../../common/utils/modalTypes";

const Header = ({
  isSideBoardOpen,
  isThreeDotsOpen,
  setIsThreeDotsOpen,
}: {
  isSideBoardOpen: boolean;
  isThreeDotsOpen: boolean;
  setIsThreeDotsOpen: (v: boolean) => void;
}) => {
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
        <h1>Platform Launch</h1>
        <div
          className={styles.buttonHeaderWrapper}
          style={{ maxWidth: "164px" }}
        >
          <Button
            text="+ Add New Task"
            onClick={() => {
              setIsAddTaskOpen(true);
            }}
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
