import {getAction} from "../actionCreators";
import {GET_SELECTED_ORDER, GET_ORDERS} from "../types/ordersTypes";
import {OrderService} from "../../services/order";
const orderService = new OrderService();


export const getUserOrders = () => (dispatch) => {
    orderService.getByUser(({data}) => {
        dispatch(getAction(GET_ORDERS, data))
    }, (e) => {
        console.log(e);
    })
}

export const getAllOrders = () => (dispatch) => {
    orderService.getByAdmin(({data}) => {
        dispatch(getAction(GET_ORDERS, data))
    })
}

export const getCurrentOrder = (order) => (dispatch) => {
    dispatch(getAction(GET_SELECTED_ORDER, order))
}
