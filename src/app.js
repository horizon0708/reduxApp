"use strict"
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import { addToCart } from './actions/cartActions';
import { createBook, deleteBook, updateBook } from './actions/bookActions';


import logger from 'redux-logger';

// create store
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import Main from './main';
const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BookForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
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