import { actionName } from "../actions/TodoListAction"
import {GET_TASK_API} from '../constants/TodoListConst';

const initialState = {
    taskList: []
}

export default (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {

    case GET_TASK_API:
        state.taskList = action.taskList;
        return { ...state }

    default:
        return state;
    }
}
