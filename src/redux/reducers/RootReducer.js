import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoListReducer from './TodoListReducer';
import reduxThunk from 'redux-thunk';

const RootReducer = combineReducers({
    TodoListReducer
})

const store = createStore(RootReducer, applyMiddleware(reduxThunk));

export default store;