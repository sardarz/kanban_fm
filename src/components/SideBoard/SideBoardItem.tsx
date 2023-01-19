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
      onClick={onClick}
    >
      <SideBoardLogo />
      <p>{text}</p>
    </div>
  );
};

export default SideBoardItem;
