import styles from "./styles.module.css"

const ColumnItem = () => {
  return (
    <div className={styles.cardWrapper}>
      <h3 className={styles.title}>Build UI for onboarding flow</h3>
      <p className={styles.subtasks}>0 of 6 subtasks</p>
    </div>
  )
}

export default ColumnItem