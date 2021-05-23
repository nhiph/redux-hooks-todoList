import logo from './logo.svg';
import './App.css';
import TodoListrfc from './todolist/TodoListrfc';
import TodoListrcc from './todolist/TodoListrcc';
import TodoListRedux from './todolist/TodoListRedux';
import BaiTapTodoListSaga from './BaiTapToDoListSaga/BaiTapTodoListSaga';
import LoadingComponent from './globalsetting/loadingComponent/LoadingComponent.js';

function App() {
  return (
    <div className="App">
    <LoadingComponent />
      <div>
      {/* <TodoListrfc /> */}
      {/* <TodoListrcc /> */}
      {/* <TodoListRedux /> */}
      <BaiTapTodoListSaga />
      </div>
    </div>
  );
}

export default App;
