import axios from 'axios';
import {environment} from "../../environment";
import {SIGN_IN, SIGN_OUT} from "../types/authTypes";
import {getAction} from "../actionCreators";
import {toast, ToastTypes} from "../../utils/toast";

export const signIn = (signInData, onSuccess) => () => {
    axios.post(`${environment.BASE_URL}/auth/login`, signInData)
        .then(({data}) => {
            onSuccess(data.token);
        })
        .catch((e) => {
            console.log(e.message)
            toast(ToastTypes.DANGER, 'Ошибка', 'Проверьте правильность написания почты и пароля');
        })
}

export const signUp = (signUpData, onSuccess) => () => {
    axios.post(`${environment.BASE_URL}/auth/registration`, signUpData)
        .then(({data}) => {
            onSuccess(data.token);
        })
            .catch((e) => {
            toast(ToastTypes.DANGER, 'Ошибка', e.message);
        })
}

export const signOut = () => {
    localStorage.removeItem('token');
    return getAction(SIGN_OUT);
}

export const setIsAuthorized = (role) => getAction(SIGN_IN, role)
