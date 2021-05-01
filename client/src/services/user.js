import axios from "axios";
import {environment} from "../environment";

export class UserService {
    token = localStorage.getItem('token');

    get(onSuccess, onError) {
        axios.get(`${environment.BASE_URL}/users`, {
            headers: {
                'Authorization': `token ${this.token}`
            }
        }).then((res) => {
            onSuccess(res);
        }).catch((e) => {
            onError(e);
        })
    }

    update(data, onSuccess, onError) {
        axios.put(`${environment.BASE_URL}/users`, data, {
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
