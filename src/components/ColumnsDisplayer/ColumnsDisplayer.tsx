import ColumnDisplayer from "../ColumnDisplayer/ColumnDisplayer"
import styles from "./styles.module.css"

const NewColumn = () => {
  return (
    <div className={styles.newColumn}>
      <p>+ New Column</p>
    </div>
  )
}

const ColumnsDisplayer = () => {
  return (
    <div className={styles.columnsDisplayer}>
      <ColumnDisplayer />
      <ColumnDisplayer />
      <ColumnDisplayer />
      <ColumnDisplayer />
      <NewColumn />
    </div>
  )
}

export default ColumnsDisplayer