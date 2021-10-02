
import axios from 'axios';
import { UserDTO } from '../modules/User/dto/user.dto';

export class Connection {

    async save(user: UserDTO): Promise<any> {
        return await axios.post('http://127.0.0.1:3000/users', { user });
    }

    async get(id: number): Promise<any> {
        return axios.get(`http://127.0.0.1:3000/users/${id}`).then((res) => {
            return res.data
        }).catch((err) => {
            return err.response.status;
        })
    }

    async getAll(query: any): Promise<any>{
        return axios.get(`http://127.0.0.1:3000/users?_limit=${parseInt(query.limit)}&_page=${parseInt(query.page)}`).then((res) => {
            return res.data
        }).catch((err) => {
            return err.response.status;
        })
    }

    async edit(user: UserDTO): Promise<any> {
        return axios.put(`http://127.0.0.1:3000/users/${user.id}`, { user }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err.response.status;
        })
    }

}