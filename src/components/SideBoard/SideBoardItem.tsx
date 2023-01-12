import SideBoardLogo from "./SideBoardLogo";
import styles from "./styles.module.css";

interface Props {
  text: string;
  active: boolean;
}

const SideBoardItem = ({ text, active }: Props) => {
  return (
    <div
      className={`${styles.sideBoardItemWrapper} ${
        active ? styles.active : ""
      }`}
    >
      <SideBoardLogo />
      <p>{text}</p>
    </div>
  );
};

export default SideBoardItem;
