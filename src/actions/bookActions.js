"use strict"

export function getBook(){
    return {
        type: "GET_BOOK"
    }
}

export function createBook(book){
    return {
        type: "CREATE_BOOK",
        payload: book
    }
}

export function deleteBook(id){
    return {
        type: "DELETE_BOOK",
        payload: id
    }
}

export function updateBook(book){
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}