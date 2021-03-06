"use strict"

//reducer
export function booksReducers(state = {books: [ ]}, action) {
    switch (action.type) {
        case "CREATE_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books:[...state.books, ...action.payload], msg: 'Saved!', style:'success', validation:'success'}
            break;
        case "DELETE_BOOK":
            const currentBooks = [...state.books];
            const indexToDel = currentBooks.findIndex(x => x._id == action.payload);
            return {books:[...currentBooks.slice(0, indexToDel), ...currentBooks.slice(indexToDel + 1) ]}
            break;
        case "UPDATE_BOOK":
            const currentBooksToUpdate = [...state.books];
            const indexToUpdate = currentBooksToUpdate.findIndex(x => x._id === action.payload._id);
            const BookToUpdate = {
                title: action.payload.title,
                author: action.payload.author,
                description: action.payload.description,
                images: action.payload.images,
                price: action.payload.price,
                _id: action.payload._id
            }
            return {...state, books: [...currentBooksToUpdate.slice(0,indexToUpdate), BookToUpdate, ...currentBooksToUpdate.slice(indexToUpdate + 1)]}
            break;
        case "GET_BOOK":
            return {...state, books:[...action.payload]}
        case "CREATE_BOOK_REJECTED":
            return {...state, msg:'Please try again', style: 'danger', validation: 'error'}
        case "RESET_BUTTON":
            return {...state, msg:null, style: 'primary', validation: null}
        case "FETCH_BOOK": // fetch with id    
            return {...state, curBook: action.payload} 
    }
    return state
}
