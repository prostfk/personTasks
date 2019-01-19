import {AUTH} from "../constants/userActionTypes";

export default (state = [], action) => {
    switch (action.type) {
        case AUTH: return action.payload;
        default: return state;
    }
}