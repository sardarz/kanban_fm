import { ReactComponent as DarkLogo } from "../../assets/logo-dark.svg";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { ReactComponent as HeaderMenuLogo } from "../../assets/icon-vertical-ellipsis.svg";
import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";
import { useState } from "react";

const Header = ({ isSideBoardOpen }: { isSideBoardOpen: boolean }) => {
  const [isThreeDotsOpen, setIsThreeDotsOpen] = useState(true);
  return (
    <div
      onClick={() => {
        setIsThreeDotsOpen(false);
      }}
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
          style={{ maxWidth: "193px" }}
        >
          <Button text="+ Add New Task" />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            setIsThreeDotsOpen(true)
          }}
          className={styles.headerMenuLogoWrapper}
        >
          <HeaderMenuLogo />
          <ThreeDotsMenu isOpen={isThreeDotsOpen} type="board" />
        </div>
      </div>
    </div>
  );
};

export default Header;
