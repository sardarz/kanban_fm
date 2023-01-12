import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./common/theme/ThemeContext";

function App() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
