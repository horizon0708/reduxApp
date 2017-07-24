"use strict"
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { addToCart } from './actions/cartActions';
import { createBook, deleteBook, updateBook } from './actions/bookActions';

import logger from 'redux-logger';

// create store
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';

render(<Provider store={store}>
    <BooksList />
    </Provider>, document.getElementById('app'))


// create and dispatch actions
store.dispatch(createBook(
    [{
        id: 1,
        title: "how to read",
        description: "this book teaches you how to read",
        price: 3.50
    },
    {
        id: 2,
        title: "how to not read",
        description: "this book teaches you how to not read",
        price: 3.50
    },
    {
        id: 3,
        title: "how to be happy",
        description: "this book teaches you how to be happy",
        price: 3.50
    },
    ]
))

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