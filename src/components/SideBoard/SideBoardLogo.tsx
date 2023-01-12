import { ReactComponent as Logo } from "../../assets/icon-board.svg";
import styles from "./styles.module.css";

const SideBoardLogo = () => {
  return (
    <div className={styles.logoWrapper}>
      <Logo />
    </div>
  );
};

export default SideBoardLogo;
