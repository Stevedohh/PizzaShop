import React, {useEffect, useRef} from 'react';
import Input from "./shared/Input";
import {emailRegex, phoneRegex} from "../utils/regex";
import {Button} from "./index";
import {useForm} from "react-hook-form";
import {UserService} from "../services/user";
import {toast, ToastTypes} from "../utils/toast";

const EditProfile = () => {
    const {register, handleSubmit, errors, watch, reset} = useForm();
    const userService = new UserService();

    const onGetSuccess = ({data}) => {
        reset({
            email: data.email,
            address: data.address,
            phone: data.phone
        })
    }

    const onUpdateSuccess = ({data}) => {
        if (data.affected >= 1) {
            toast(ToastTypes.SUCCESS, 'Красота', 'Профиль успешно обновлен')
        }
    }

    useEffect(() => {
        userService.get(onGetSuccess);
    }, []);

    const onSubmit = (data) => {
        delete data.repeatedPassword;

        if (data.password) {
            userService.update(data, onUpdateSuccess)
            return
        }

        delete data.password
        userService.update(data, onUpdateSuccess)
    };

    const password = useRef({});
    password.current = watch('password', '');


    return (
        <div className="edit-profile">
            <h1 className="edit-profile__title">Профиль</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="edit-profile__form">
                <Input
                    type="text"
                    label="Email"
                    name="email"
                    register={register({pattern: emailRegex})}
                >
                    {errors.email && (<span className="error-message">
                                Невалидный Email
                            </span>)}
                </Input>
                <Input
                    type="text"
                    label="Адрес"
                    name="address"
                    register={register()}
                >
                    {errors.address && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Input
                    type="text"
                    label="Телефон"
                    name="phone"
                    register={register({pattern: phoneRegex})}
                >
                    {errors.phone && (<span className="error-message">
                                Невалидный номер телефона
                            </span>)}
                </Input>
                <Input
                    type="password"
                    label="Пароль"
                    name="password"
                    register={register({minLength: 2})}
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
                <Button submit className="sign__form-submit">Обновить</Button>
            </form>
        </div>
    );
};

export default EditProfile;
