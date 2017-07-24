"use strict"
import { createStore } from 'redux';
import reducers from './reducers/index';


// create store
const store = createStore(reducers);
store.subscribe(function () {
    console.log('current state is: ', store.getState());
})

// create and dispatch actions
store.dispatch({
    type: "CREATE_BOOK",
    payload: [{
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
})

//CRUD 

// delte
store.dispatch({
    type: "DELETE_BOOK",
    payload: {id: 1}
})

store.dispatch({
    type: "UPDATE_BOOK",
    payload: {
        id: 2,
        title: "READING IS BAD"
    }
})
