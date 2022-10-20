import "./App.css";
import { Weather } from "./components/Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Weather mate?</h1>
        
        <div className="main-weather">
          <Weather />
        </div>
      </header>
    </div>
  );
}

export default App;
