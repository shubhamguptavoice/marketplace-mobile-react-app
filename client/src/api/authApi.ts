import axios from 'axios';

export interface data {
    email: string;
    password: string;
}
// login api
export const loginApi = (data: data) =>
    axios({
        method: 'post',
        url: 'http://localhost:8001/api/gmail/login1',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    });

export const registerApi = (data: any) =>
    axios({
        method: 'post',
        url: 'http://localhost:8001/api/gmail/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    });

export const ListedItemsApi = () =>
    axios({
        method: 'get',
        url: 'http://localhost:8001/api/upload-products',
        headers: {
            'Content-Type': 'application/json'
        }
    });

export const SoldProductsApi = (seller_id: any) =>
    axios({
        method: 'get',
        url: `http://localhost:8001/api/sold-products/${seller_id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
