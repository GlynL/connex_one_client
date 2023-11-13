import "./App.css";
import Metrics from "./Metrics";
import Time from "./Time";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="layout">
        <div className="section">
          <Time />
        </div>
        <div className="section">
          <Metrics />
        </div>
      </main>
    </div>
  );
}

export default App;
