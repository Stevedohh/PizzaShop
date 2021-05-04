import React, {useEffect} from 'react';
import Modal from "react-modal";
import { useModal } from "react-modal-hook";
import {useDispatch, useSelector} from "react-redux";
import {getUserOrders, getCurrentOrder, getAllOrders} from "../redux/actions/ordersActions";
import OrderModal from "./OrderModal";
import Button from "./shared/Button";
import cartEmptyImage from "../assets/img/empty-cart.png";
import {Link} from "react-router-dom";

const Orders = ({admin}) => {
    Modal.setAppElement('#root')
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);

    useEffect(() => {
        if (admin) {
            dispatch(getAllOrders())
        } else {
            dispatch(getUserOrders())
        }
    }, [])

    const onShowModal = (order) => {
        dispatch(getCurrentOrder(order));
        showModal();
    }

    const [showModal, hideModal] = useModal(() => (
        <Modal
            overlayClassName="overlay"
            className="modal-content"
            isOpen
            onRequestClose={hideModal}
            shouldCloseOnOverlayClick={true}
        >
            <OrderModal/>
        </Modal>
    ));

    const renderOrders = () =>
        orders.map(order => {
            return (
                <tr className="orders__row" key={order.id}>
                    <td className="orders__row-date">
                        {new Date(order.date).toLocaleString()}
                    </td>
                    <td className="orders__row-address">
                        {order.address}
                    </td>
                    <td className="orders__row-phone">
                        {order.phone}
                    </td>
                    <td className="orders__row-email">
                        {order.email}
                    </td>
                    <td className="orders__row-cost">
                        <strong>{order.totalPrice}</strong> грн
                    </td>
                    <td>
                        <Button outline className='orders__details-btn' onClick={() => {
                            onShowModal(order)
                        }}>
                            Детали
                        </Button>
                    </td>
                </tr>
            )
        })


    return (
        <div className="orders">
            {

                orders.length ? (
                    <>
                        <h1 className="orders__title">Заказы</h1>
                        <table className="orders__table">
                            <thead>
                            <tr className="orders__row orders__row--head">
                                <td className="orders__row-date">
                                    Дата
                                </td>
                                <td className="orders__row-address">
                                    Адресс
                                </td>
                                <td className="orders__row-phone">
                                    Телефон
                                </td>
                                <td className="orders__row-email">
                                    Email
                                </td>
                                <td className="orders__row-cost">
                                    Сумма
                                </td>
                                <td className="orders__row-cost">
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                renderOrders()
                            }
                            </tbody>
                        </table>
                    </>
                    ) : (
                    <div className="cart cart--empty">
                        <p>
                            Вероятней всего, вы не заказывали ещё пиццу.
                            <br/>
                            Для того, чтобы заказать пиццу, перейди на главную страницу.
                        </p>
                        <img src={cartEmptyImage} alt="Empty cartReducer"/>
                        <Link to="/" className="button button--black">
                            <span>На главную</span>
                        </Link>
                    </div>
                )
            }
        </div>
    )
};

export default Orders;
