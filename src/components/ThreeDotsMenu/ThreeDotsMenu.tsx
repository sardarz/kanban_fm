import styles from "./styles.module.css"

interface Props {
  type: string
  isOpen: boolean
}

const ThreeDotsMenu = ({type, isOpen}: Props) => {
  const text = type === "board" ? "board" : "task"
  
  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.isOpen : ""}`}>
      <p className={styles.edit}>Edit {text}</p>
      <p className={styles.delete}>Delete {text}</p>
    </div>
  )
}

export default ThreeDotsMenu