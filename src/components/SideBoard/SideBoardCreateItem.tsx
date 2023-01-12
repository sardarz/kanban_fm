import styles from "./styles.module.css"
import SideBoardLogo from './SideBoardLogo'

const SideBoardCreateItem = () => {
  return (
    <div className={`${styles.sideBoardItemWrapper} ${styles.createItem}`}>
    <SideBoardLogo />
    <p className={styles.button}>+ Create New Board</p>
  </div>
  )
}

export default SideBoardCreateItem