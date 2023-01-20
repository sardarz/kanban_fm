import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import ShowSideBoard from "./components/ShowSideBoard/ShowSideBoard";
import SideBoard from "./components/SideBoard/SideBoard";
import styles from "./styles.module.css";

function App() {
  const [isSideBoardOpen, setIsSideBoardOpen] = useState(false);
  const [isThreeDotsOpen, setIsThreeDotsOpen] = useState(false);

  const bodyWidth = document.body.clientWidth;
  const allState = useSelector((state) => state);

  useEffect(() => {
    const saveData = () => {
      localStorage.setItem("kanban-data", JSON.stringify(allState));
    };
    window.addEventListener("unload", saveData);
    return () => {
      window.removeEventListener("unload", saveData);
    };
  }, [allState]);

  return (
    <div
      className="App"
      onClick={() => {
        setIsThreeDotsOpen(false);
        if (bodyWidth <= 700) setIsSideBoardOpen(false);
      }}
    >
      <div className={styles.showButtonWrapper}>
        <ShowSideBoard onClick={() => setIsSideBoardOpen(true)} />
      </div>
      <SideBoard
        isOpen={isSideBoardOpen}
        closeSideBoard={() => setIsSideBoardOpen(false)}
      />
      <Header
        isSideBoardOpen={isSideBoardOpen}
        setIsSideBoardOpen={setIsSideBoardOpen}
        isThreeDotsOpen={isThreeDotsOpen}
        setIsThreeDotsOpen={setIsThreeDotsOpen}
      />
      <Board isSideBoardOpen={isSideBoardOpen} />
    </div>
  );
}

export default App;
