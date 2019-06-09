import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Routes from './routes';
import Reducer from './reducers';
import './Resources/css/styles.css';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
