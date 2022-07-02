import './App.css';
import Birthday from './components/Birthday';
import data from './components/data';
import { useState } from "react"

function App() {
  const [people, setPeople] = useState(data)
  return (
    <div className="App container d-flex justify-content-center mt-5">
      <div className="card shadow mt-4 p-3">
        <div className="card-body">
        <Birthday people={people} />
        <button onClick={() => setPeople([])} className="btn btn-blue shadow mt-4">Clear all</button>
        </div>
      </div>
    </div>
  );
}

export default App;
