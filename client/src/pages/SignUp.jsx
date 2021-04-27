import React, {useRef} from 'react';
import Input from "../components/shared/Input";
import {Button} from "../components";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {decodeToken} from "react-jwt";
import {setIsAuthorized, signIn, signUp} from "../redux/actions/authActions";
import {toast, ToastTypes} from "../utils/toast";
import {emailRegex, phoneRegex} from "../utils/regex";

const SignUp = () => {
    const {register, handleSubmit, errors, watch} = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const password = useRef({});
    password.current = watch("password", "");

    const onSignUpSuccess = (token) => {
        localStorage.setItem('token', token);
        const role = decodeToken(token).role;
        dispatch(setIsAuthorized(role));
        history.push('/')
        toast(ToastTypes.SUCCESS, 'Успешно', 'Вы успешно зарегистрировались');
    }

    const onSubmit = (data) => {
        delete data.repeatedPassword;
        dispatch(signUp(data, onSignUpSuccess))
    };

    return (
        <div className="sign">
            <div className="sign__title">
                <h1>
                    Регистрация
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
                <Input
                    type="password"
                    label="Повторите пароль"
                    name="repeatedPassword"
                    register={register({
                        required: "Обязательное поле",
                        validate: value =>
                            value === password.current || "Пароли не совпадают"
                    })}
                >
                    {errors.repeatedPassword &&
                    (<span className="error-message">
                            {errors.repeatedPassword.message}
                        </span>)
                    }
                </Input>
                <Input
                    type="text"
                    label="Адресс"
                    name="address"
                    register={register({required: true})}
                >
                    {errors.address && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Input
                    type="text"
                    label="Телефон"
                    name="phone"
                    register={register({required: true, pattern: phoneRegex})}
                >
                    {errors.phone && (<span className="error-message">
                                Невалидный номер телефона
                            </span>)}
                </Input>
                <Button submit className="sign__form-submit">Зарегистрироваться</Button>
            </form>
        </div>
    );
};

export default SignUp;
