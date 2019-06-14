import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_SELL:
            console.log('GET_PRODUCTS_BY_SELL', action.payload);

            return {
                ...state,
                bySell: action.payload
            }

        case GET_PRODUCTS_BY_ARRIVAL:
            console.log('GET_PRODUCTS_BY_ARRIVAL', action.payload);

            return {
                ...state,
                byArrival: action.payload
            }

        default:
            return state;
    }
}
