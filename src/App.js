import logo from './logo.svg';
import './App.css';
import TodoListrfc from './todolist/TodoListrfc';
import TodoListrcc from './todolist/TodoListrcc';
import TodoListRedux from './todolist/TodoListRedux';

function App() {
  return (
    <div className="App">
      {/* <TodoListrfc /> */}
      {/* <TodoListrcc /> */}
      <TodoListRedux />
    </div>
  );
}

export default App;
