"use strict"

//reducer
export function booksReducers(state = {books: []}, action) {
    switch (action.type) {
        case "CREATE_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books:[...state.books, ...action.payload]}
            break;
        case "DELETE_BOOK":
            const currentBooks = [...state.books];
            const indexToDel = currentBooks.findIndex(x => x.id === action.payload.id);
            return {books:[...currentBooks.slice(0, indexToDel), ...currentBooks.slice(indexToDel + 1) ]}
            break;
        case "UPDATE_BOOK":
            const currentBooksToUpdate = [...state.books];
            const indexToUpdate = currentBooksToUpdate.findIndex(x => x.id === action.payload.id);
            const BookToUpdate = {
                ...currentBooksToUpdate[indexToUpdate],
                title: action.payload.title
            }
            return {books: [...currentBooksToUpdate.slice(0,indexToUpdate), BookToUpdate, ...currentBooksToUpdate.slice(indexToUpdate + 1)]}
            break;
    }
    return state
}
