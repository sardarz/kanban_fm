import { ReactComponent as HideLogo } from "../../assets/icon-hide-sidebar.svg";
import styles from "./styles.module.css";

const HideSidebar = () => {
  return (
    <div className={styles.hideWrapper}>
      <HideLogo />
      <p>Hide Sidebar</p>
    </div>
  );
};

export default HideSidebar;
