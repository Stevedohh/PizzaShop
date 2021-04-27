import {SIGN_IN, SIGN_OUT} from "../types/authTypes";
import {decodeToken} from "react-jwt";

const token = localStorage.getItem('token');

const initialState = {
    isAuthorized: token,
    role: token ? decodeToken(token).role : ''
}

const authReducer = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isAuthorized: true,
                role: payload
            }

        case SIGN_OUT:
            return  {
                ...state,
                isAuthorized: false,
                role: ''
            }

        default:
            return state;
    }
}

export default authReducer;
