import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import SideBoard from "./components/SideBoard/SideBoard";

function App() {
  const [isSideBoardOpen, setIsSideBoardOpen] = useState(false);

  return (
    <div className="App">
      <SideBoard isOpen={isSideBoardOpen}/>
      <Header />
    </div>
  );
}

export default App;
