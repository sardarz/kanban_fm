import styles from "./styles.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
}
const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div onClick={onClick} className={styles.button}>
      {text}
    </div>
  );
};

export default Button;
