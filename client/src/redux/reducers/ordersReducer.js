import {GET_SELECTED_ORDER, GET_ORDERS} from "../types/ordersTypes";

const initialState = {
    orders: [],
    selectedOrder: []
};

const ordersReducer = (state = initialState, action) => {
    const payload = action.payload

    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: payload
            };

        case GET_SELECTED_ORDER:
            return {
                ...state,
                selectedOrder: payload
            };

        default:
            return state;
    }
};

export default ordersReducer;
