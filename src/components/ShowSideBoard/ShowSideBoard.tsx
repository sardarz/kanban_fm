import styles from "./styles.module.css";
import { ReactComponent as EyeLogo } from "../../assets/icon-show-sidebar.svg";

interface ShowProps {
  onClick: () => void;
}

const ShowSideBoard = ({ onClick }: ShowProps) => {
  return (
    <div className={styles.showButton} onClick={onClick}>
      <EyeLogo />
    </div>
  );
};

export default ShowSideBoard;
