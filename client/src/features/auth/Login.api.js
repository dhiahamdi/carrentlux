import axios from "axios";
import { api_url } from '../../config/Params.constant';
import storage from './Storage';

class AuthService {


    login(email, password) {
        return axios.post(`${api_url}/api/auth/login`, { email: email, password: password });
    }

    logout() {
        storage.logout();
    }

    checkUser() {
        let token = storage.getToken();
        return axios.post(`${api_url}/api/auth/checkuser`, {}, {
            headers: {
                'carrent-tkn': token
            }
        });
    }

}

export default new AuthService()