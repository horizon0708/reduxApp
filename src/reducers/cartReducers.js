"use strict"

// CART REDUCERS

export function cartReducers(state = { cart: [] }, action) {
    switch (action.type) {
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
            const currentBookToUpdate = [...state.cart];
            const indexToUpdate = currentBookToUpdate.findIndex(x => x._id === action._id);
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + action.quantity
            }

            let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate)
                , newBookToUpdate
                , ...currentBookToUpdate.slice(indexToUpdate + 1)];
            return {
                ...state,
                cart: cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalQty: totals(cartUpdate).quantity

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