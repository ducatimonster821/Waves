import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP
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

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
    const data = {
        limit,
        skip,
        filters
    }

    console.log('data', data);

    const request = axios.post(`${targetURI}${PRODUCT_SERVER}/shop`, data)
        .then(response => {
            return {
                size: response.data.size,
                articles: response.data.articles,
            }
        });

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}

// CATEGORIES

export function getBrands() {
    const request = axios.get(`${targetURI}${PRODUCT_SERVER}/brands`)
        .then(response => response.data);

    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function getWoods() {
    const request = axios.get(`${targetURI}${PRODUCT_SERVER}/woods`)
        .then(response => response.data);

    return {
        type: GET_WOODS,
        payload: request
    }
}

