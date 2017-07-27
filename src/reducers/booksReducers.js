"use strict"

//reducer
export function booksReducers(state = {books: [{
        _id: 1,
        title: "how to read",
        description: "this book teaches you how to read",
        price: 3.50
    },
    {
        _id: 2,
        title: "how to not read",
        description: "this book teaches you how to not read",
        price: 3.50
    },
    {
        _id: 3,
        title: "how to be happy",
        description: "this book teaches you how to be happy",
        price: 3.50
    },
    ]}, action) {
    switch (action.type) {
        case "CREATE_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books:[...state.books, ...action.payload]}
            break;
        case "DELETE_BOOK":
            const currentBooks = [...state.books];
            const indexToDel = currentBooks.findIndex(x => x._id === action.payload._id);
            return {books:[...currentBooks.slice(0, indexToDel), ...currentBooks.slice(indexToDel + 1) ]}
            break;
        case "UPDATE_BOOK":
            const currentBooksToUpdate = [...state.books];
            const indexToUpdate = currentBooksToUpdate.findIndex(x => x._id === action.payload._id);
            const BookToUpdate = {
                ...currentBooksToUpdate[indexToUpdate],
                title: action.payload.title
            }
            return {books: [...currentBooksToUpdate.slice(0,indexToUpdate), BookToUpdate, ...currentBooksToUpdate.slice(indexToUpdate + 1)]}
            break;
        case "GET_BOOK":
            return {...state, books:[...state.books]}
    }
    return state
}
