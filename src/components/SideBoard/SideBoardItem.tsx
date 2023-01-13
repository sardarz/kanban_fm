import SideBoardLogo from "./SideBoardLogo";
import styles from "./styles.module.css";

interface Props {
  text: string;
  active: boolean;
  onClick: () => void;
}

const SideBoardItem = ({ text, active, onClick }: Props) => {
  return (
    <div
      className={`${styles.sideBoardItemWrapper} ${
        active ? styles.active : ""
      }`}
    >
      <SideBoardLogo />
      <p onClick={onClick}>{text}</p>
    </div>
  );
};

export default SideBoardItem;
