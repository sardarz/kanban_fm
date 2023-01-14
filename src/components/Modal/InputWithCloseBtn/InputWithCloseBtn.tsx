import styles from "./styles.module.css"
import { ReactComponent as CloseIcon } from "../../../assets/icon-cross.svg"

const InputWithCloseBtn = () => {
  return (
    <div className={styles.wrapper}>
      <input type="text" value="Todo" />
      <div className={styles.closeBtn}>
        <CloseIcon />
      </div>
    </div>
  )
}

export default InputWithCloseBtn