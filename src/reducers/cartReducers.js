"use strict"

// CART REDUCERS

export function cartReducers(state = { cart: [] }, action) {
    switch (action.type) {
        case "GET_CART":
            return{
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity
            }
            break;
        
        case "ADD_TO_CART":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity
            }
            break;
        case "DELETE_CART_ITEM":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity

            }
            break;
        case "UPDATE_CART":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity

            };
            break;
    }
    return state;
}

export function totals(payloadArr) {
    const totalAmount = payloadArr.map(x => x.price * x.quantity).reduce((a, b) => {
        return a + b;
    }, 0)

    const totalQty = payloadArr.map(x => x.quantity).reduce((a, b) => a + b, 0);

    return {
        amount: totalAmount.toFixed(2),
        quantity: totalQty
    }
}