import { AUTH_SUCCESS } from "../Actions/actionTypes";

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
        return {
            ...state, token: action.token
        }
        default:
            return state;
    }
}