"use strict"


export function addToCart(book){
    return {
        type: "ADD_TO_CART",
        payload: book
    }
}

export function DELETE_CART_ITEM(cart){
    return {
        type: "DELETE_CART_ITEM",
        payload: cart
    }
}