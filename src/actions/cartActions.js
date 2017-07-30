"use strict"
import axios from 'axios';

export function getCart(){
    return dispatch => {
        axios.get('/api/cart')
        .then(response => {
            dispatch({type:"GET_CART", payload: response.data})
        })
        .catch(err=>{
            dispatch({type:"GET_CART_FAILED", payload: "ERROR GETTING CART"})
        })
    }
}

export function addToCart(cart){
    return dispatch => {
        axios.post("/api/cart", cart)
        .then(response=>{
            dispatch({type:"ADD_TO_CART", payload: response.data})
        })
        .catch(err=>{
            dispatch({type:"ADD_TO_CART_FAILED", payload: "ERROR ADDING TO CART"})
        })
    }
}

export function deleteCartItem(cart){
    return dispatch => {
        axios.post("/api/cart", cart)
        .then(response=>{
            dispatch({type:"DELETE_CART_ITEM", payload: response.data})
        })
        .catch(err=>{
            dispatch({type:"DELETE_CART_ITEM_FAILED", payload: "ERROR ADDING TO CART"})
        })
    }
}

export function updateCart(_id, quantity, cart){
    const currentBookToUpdate = [...cart];
            const indexToUpdate = currentBookToUpdate.findIndex(x => x._id === _id);
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + quantity
            }

            let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate)
                , newBookToUpdate
                , ...currentBookToUpdate.slice(indexToUpdate + 1)];
    
    return dispatch => {
        axios.post("/api/cart", cartUpdate)
        .then(response=>{
            dispatch({type:"UPDATE_CART", payload: response.data})
        })
        .catch(err=>{
            dispatch({type:"UPDATE_CART_FAILED", payload: "ERROR ADDING TO CART"})
        })
    }
}