import axios from "axios";
import {environment} from "../environment";

export class ProductService {
    token = localStorage.getItem('token');
    authorization = {'Authorization': `token ${this.token}`}

    create(data, onSuccess, onError) {
        axios.post(`${environment.BASE_URL}/product`, data, {
            headers: this.authorization
        }).then(res => {
            onSuccess(res)
        }).catch(e => {
            onError(e)
        });
    }

    update(id, data, onSuccess, onError) {
        axios.put(`${environment.BASE_URL}/product/${id}`, data, {
            headers: this.authorization
        }).then(res => {
            onSuccess(res)
        }).catch(e => {
            onError(e)
        });
    }

    delete(id, onSuccess, onError) {
        axios.delete(`${environment.BASE_URL}/product/${id}`, {
            headers: this.authorization
        }).then(res => {
            onSuccess(res)
        }).catch(e => {
            onError(e)
        });
    }
}
