import styles from "./styles.module.css";
import { ReactComponent as MobileAddIcon } from "../../assets/icon-add-task-mobile.svg";

interface ButtonProps {
  text: string | React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  typeOfBtn: "primary" | "modalPrimary" | "modalSecondary" | "modalDelete";
}
const Button = ({ text, onClick, isDisabled, typeOfBtn }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      className={`${styles.button} ${styles[typeOfBtn]} ${
        isDisabled ? styles.disabled : ""
      }`}
    >
      <span className={styles.addIcon}>
        <MobileAddIcon />
      </span>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
