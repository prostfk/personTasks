import {SET_TASKS} from "../constants/taskActionTypes";

export default (state=[], action) => {

    switch (action.type) {
        case SET_TASKS:
            return action.payload;
        default:
            return state;
    }

}