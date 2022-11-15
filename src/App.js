import "./App.css";
import { Weather } from "./components/Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main-weather">
          <Weather />
        </div>
      </header>
    </div>
  );
}

export default App;
