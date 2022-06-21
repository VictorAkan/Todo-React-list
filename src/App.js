
import './App.css';
import { RecoilRoot } from "recoil";
import TodoListApp from './components/TodoApp';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoListApp />
      </RecoilRoot>
    </div>
  );
}

export default App;
