import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoListReducer from './TodoListReducer';
import reduxThunk from 'redux-thunk';

// middleware saga
import createMiddleWareSaga from 'redux-saga';
import { RootSaga } from "../saga/RootSaga";

const middleWareSage = createMiddleWareSaga();

const RootReducer = combineReducers({
    TodoListReducer
})

// gan middleware thunk va saga vao
const store = createStore(RootReducer, applyMiddleware(reduxThunk, middleWareSage));

// GOi saga thuc thi
middleWareSage.run(RootSaga); //ham run nhan vao generator function, rootSaga la generator function

export default store;