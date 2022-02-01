import axios from "axios";
import { api_url } from '../../config/Params.constant';
import storage from '../auth/Storage';

class CarService {

    fetchCars(search) {
        let token = storage.getToken();
        return axios.post(`${api_url}/api/car/list`, search , {
            headers: {
                'carrent-tkn': token
            }
        });
    }

}

export default new CarService()