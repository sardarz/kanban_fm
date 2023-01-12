import styles from "./styles.module.css"

interface ButtonProps {
  text: string;
}
const Button = ({text}: ButtonProps) => {
  return (
    <div className={styles.button}>{text}</div>
  )
}

export default Button