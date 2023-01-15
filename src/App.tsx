import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import ShowSideBoard from "./components/ShowSideBoard/ShowSideBoard";
import SideBoard from "./components/SideBoard/SideBoard";
import styles from "./styles.module.css";

function App() {
  const [isSideBoardOpen, setIsSideBoardOpen] = useState(false);
  const [isThreeDotsOpen, setIsThreeDotsOpen] = useState(false);

  return (
    <div
      className="App"
      onClick={() => {
        setIsThreeDotsOpen(false);
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
        isThreeDotsOpen={isThreeDotsOpen}
        setIsThreeDotsOpen={setIsThreeDotsOpen}
      />
      <Board isSideBoardOpen={isSideBoardOpen} />
    </div>
  );
}

export default App;
