import React from 'react';
import {useSelector} from "react-redux";

const OrderModal = () => {
    const order = useSelector((state) => state.orders.selectedOrder);
    const {orderProduct} = order;

    return (
        <div className="order-modal">
            <div className="order-modal__list">
                <div className="order-modal__item">
                    <span className="order-modal__item-key">Дата</span>
                    <span className="order-modal__item-value">{new Date(order.date).toLocaleString()}</span>
                </div>
                <div className="order-modal__item">
                    <span className="order-modal__item-key">Адресс</span>
                    <span className="order-modal__item-value">{order.address}</span>
                </div>
                <div className="order-modal__item">
                    <span className="order-modal__item-key">Телефон</span>
                    <span className="order-modal__item-value">{order.phone}</span>
                </div>
                <div className="order-modal__item">
                    <span className="order-modal__item-key">Email</span>
                    <span className="order-modal__item-value">{order.email}</span>
                </div>
                <div className="order-modal__item">
                    <span className="order-modal__item-key">Всего</span>
                    <span className="order-modal__item-value"><strong>{order.totalPrice}</strong> грн</span>
                </div>
            </div>
            {
                orderProduct.map(({quantity, product}) => {
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
    )
};

export default OrderModal;
