import { ReactComponent as HideLogo } from "../../assets/icon-hide-sidebar.svg";
import styles from "./styles.module.css";

const HideSidebar = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.hideWrapper} onClick={onClick}>
      <HideLogo />
      <p>Hide Sidebar</p>
    </div>
  );
};

export default HideSidebar;
