import styles from "./styles.module.css";

interface ButtonProps {
  text: string;
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
      {text}
    </button>
  );
};

export default Button;
