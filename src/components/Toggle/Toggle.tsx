import { useContext } from "react";
import { ThemeContext } from "../../common/theme/ThemeContext";
import styles from "./styles.module.css";

const Toggle = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.outer} ${theme !== "" ? styles.dark : ""}`}
      onClick={changeTheme}
    >
      <div className={styles.inner}></div>
    </div>
  );
};

export default Toggle;
