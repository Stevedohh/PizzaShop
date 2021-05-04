import axios from "axios";
import {environment} from "../environment";

export class OrderService {
    token = localStorage.getItem('token');

    create(order, onSuccess, onError) {
        axios.post(`${environment.BASE_URL}/order`, order, {
            headers: this.token ? {
                'Authorization': `token ${this.token}`
            } : {}
        }).then(res => {
            onSuccess(res);
        }).catch(e => {
            onError(e)
        })
    }

    getByUser(onSuccess, onError) {
        axios.get(`${environment.BASE_URL}/order/user`, {
            headers: {
                'Authorization': `token ${this.token}`
            }
        }).then((res) => {
            onSuccess(res)
        }).catch((e) => {
            onError(e)
        })
    }

    getByAdmin(onSuccess, onError) {
        axios.get(`${environment.BASE_URL}/order`, {
            headers: {
                'Authorization': `token ${this.token}`
            }
        }).then((res) => {
            onSuccess(res)
        }).catch((e) => {
            onError(e)
        })
    }
}
