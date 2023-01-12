import { useState } from "react";
import "./App.css";
import SideBoard from "./components/SideBoard/SideBoard";

function App() {
  const [isSideBoardOpen, setIsSideBoardOpen] = useState(false);

  return (
    <div className="App">
      <SideBoard isOpen={isSideBoardOpen}/>
    </div>
  );
}

export default App;
