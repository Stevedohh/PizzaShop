import React from 'react';
import Input from "../components/shared/Input";
import {Button} from "../components";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {setIsAuthorized, signIn} from "../redux/actions/authActions";
import {decodeToken} from "react-jwt";
import {toast, ToastTypes} from "../utils/toast";
import {useHistory} from "react-router";
import {emailRegex} from "../utils/regex";

const SignIn = () => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSignInSuccess = (token) => {
        localStorage.setItem('token', token);
        const role = decodeToken(token).role;
        dispatch(setIsAuthorized(role));
        history.push('/')
        toast(ToastTypes.SUCCESS, 'Успешно', 'Вы успешно вошли');
    }

    const onSubmit = (data) => {
        dispatch(signIn(data, onSignInSuccess))
    };


    return (
        <div className="sign">
            <div className="sign__title">
                <h1>
                    Вход
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="sign__form">
                <Input
                    type="text"
                    label="Email"
                    name="email"
                    register={register({required: true, pattern: emailRegex})}
                >
                    {errors.email && (<span className="error-message">
                                Невалидный Email
                            </span>)}
                </Input>
                <Input
                    type="password"
                    label="Пароль"
                    name="password"
                    register={register({required: true, minLength: 2})}
                >
                    {errors.password && (<span className="error-message">
                                Слабый пароль
                            </span>)}
                </Input>
                <Button submit className="sign__form-submit">Войти</Button>
            </form>
        </div>
    );
};

export default SignIn;
