"use strict"
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import { addToCart } from './actions/cartActions';
import { createBook, deleteBook, updateBook } from './actions/bookActions';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

// create store
const middleware = applyMiddleware(thunk, logger);
// passing initial state from server store
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);

import routes from './routes';
const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>
)

render(Routes, document.getElementById('app'))


// create and dispatch actions
// store.dispatch(createBook(
    
// ))

//CRUD 

// delte
// store.dispatch(deleteBook(
//     { id: 1 }
// ))

// store.dispatch(updateBook(
//     {
//         id: 2,
//         title: "READING IS BAD"
//     }
// ))

// store.dispatch(addToCart({ id: 1 }));