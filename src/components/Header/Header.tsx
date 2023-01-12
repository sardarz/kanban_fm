import { ReactComponent as DarkLogo } from "../../assets/logo-dark.svg";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { ReactComponent as HeaderMenuLogo } from "../../assets/icon-vertical-ellipsis.svg";

const Header = ({ isSideBoardOpen }: { isSideBoardOpen: boolean }) => {
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
          style={{ maxWidth: "193px" }}
        >
          <Button text="+ Add New Task" />
        </div>
        <div className={styles.headerMenuLogoWrapper}>
          <HeaderMenuLogo />
        </div>
      </div>
    </div>
  );
};

export default Header;
