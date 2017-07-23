"use strict"
import {createStore} from 'redux';

//reducer
const reducer = function( state = 0, action){
    switch(action.type){
        case "INCREMENT":
        return state + action.payload;
        case "DECREMENT":
        return state - action.payload;
    }
    return state
}


// create store
const store = createStore(reducer);
store.subscribe(function(){
    console.log('current state is: ' + store.getState());
})

// create and dispatch actions
store.dispatch({type: "INCREMENT", payload: 1})

store.dispatch({type: "DECREMENT", payload: 1});
