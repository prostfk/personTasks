import {ORDER_ASC, ORDER_DESC, SET_TASKS} from "../constants/taskActionTypes";

export default (state=[], action) => {

    switch (action.type) {
        case SET_TASKS:
            if (!action.payload){
                return state;
            }else{
                return action.payload;
            }
        case ORDER_ASC:
            return state.splice(0).sort((a, b) => a[action.payload] < b[action.payload] ? -1 : 1);
        case ORDER_DESC:
            return state.splice(0).sort((a, b) => a[action.payload] > b[action.payload] ? -1 : 1);
        default:
            return state;
    }

}