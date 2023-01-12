import Toggle from "./Toggle";
import styles from "./styles.module.css";
import { ReactComponent as Light } from "../../assets/icon-light-theme.svg";
import { ReactComponent as Dark } from "../../assets/icon-dark-theme.svg";

const SideBoardToggleWrapper = () => {
  return (
    <div className={styles.toggleWrapper}>
      <Light />
      <Toggle />
      <Dark />
    </div>
  );
};

export default SideBoardToggleWrapper;
