import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Input from "../components/shared/Input";
import {emailRegex, phoneRegex} from "../utils/regex";
import {Button} from "../components";
import {useForm} from "react-hook-form";
import {UserService} from "../services/user";
import {OrderService} from "../services/order";
import {useHistory} from "react-router";
import {toast, ToastTypes} from "../utils/toast";
import {clearCart} from "../redux/actions/cartActions";

const OrderPage = () => {
    const userService = new UserService();
    const orderService = new OrderService();

    const products = useSelector(state => state.cart.items);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const {register, handleSubmit, errors, reset} = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const onGetSuccess = ({data}) => {
        reset({
            email: data.email,
            address: data.address,
            phone: data.phone
        })
    }

    useEffect(() => {
        if(token) {
            userService.get(onGetSuccess);
        }
    }, []);

    const onCreateOrderSuccess = (res) => {
        history.push('/');
        dispatch(clearCart());
        toast(ToastTypes.SUCCESS, 'Успешно', 'Ожидайте, скоро с Вами свяжется менеджер')
    }

    const onSubmit = (data) => {
        const order = {
            ...data,
            orderProduct: Object.values(products).map(({id, quantity}) => {
                return {
                    productId: id,
                    quantity
                }
            })
        }

        orderService.create(order, onCreateOrderSuccess)
    }

    return (
        <div className="content">
            <div className="container">
               <h2 className="content__title">Ваш заказ</h2>
                <div className="order">
                    <form onSubmit={handleSubmit(onSubmit)} className="order__form">
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
                            type="text"
                            label="Адрес"
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
                        <Button submit className="sign__form-submit">Оплатить</Button>
                    </form>
                    <div className="order__products">
                        <span className="order__price">Всего: <strong>{totalPrice}</strong> грн</span>
                        {
                            Object.values(products).map(({items, quantity}) => {
                                const product = items[0]
                                return (
                                    <div className="cart__item" key={product.id}>
                                        <div className="cart__item-img">
                                            <img
                                                className="pizza-block__image"
                                                src={product.imageUrl}
                                                alt="Pizza"
                                            />
                                        </div>
                                        <div className="cart__item-info">
                                            <h3>{product.name}</h3>
                                            <p>
                                                {product.type} тесто, {product.size} см.
                                            </p>
                                            <p>
                                                {product.category}
                                            </p>
                                        </div>
                                        <div className="cart__item-count">
                                            <b>{quantity}</b>
                                        </div>
                                        <div className="cart__item-price">
                                            <b>{product.price * quantity} ₴</b>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
