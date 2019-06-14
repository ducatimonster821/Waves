import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL
} from './types';
import {PRODUCT_SERVER} from '../components/utils/misc';
import {targetURI} from '../keys';

export function getProductsBySell() {
    // ?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${targetURI}${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
}

export function getProductsByArrival() {
    const request = axios.get(`${targetURI}${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}
