"use strict"
import axios from 'axios';


export function getBook(){
    return (dispatch)=>{
        axios.get("/api/books")
            .then(response=>{
                dispatch({type:"GET_BOOK", payload:response.data})
            })
            .catch(err=>{
                dispatch({type:"GET_BOOKS_REJECTED", payload: err})
            })
    }
}

export function createBook(book){
    return (dispatch)=> {
        axios.post("/api/books", book)
        .then(response =>{
            dispatch({type: "CREATE_BOOK", payload: response.data})
        })
        .catch(err=>{
            dispatch({type: "CREATE_BOOK_REJECTED", payload: "THERE WAS AN ERROR WHILE POSTING A NEW BOOK."})
        })
    }
    
    // return {
    //     type: "CREATE_BOOK",
    //     payload: book
    // }
}

export function deleteBook(id){
    return dispatch => {
        axios.delete("/api/books/" + id)
        .then(response =>{
            dispatch({type:"DELETE_BOOK", payload: id})
        })
        .catch(err=>{
            dispatch({type:"DELETE_BOOK_REJECTED", payload: err})
        })
    }
}

export function updateBook(book){
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}

export function resetButton(){
    return {
        type: "RESET_BUTTON"
    }
}

export function fetchBook(id){
    return dispatch => {
        axios.get('/api/books/' + id)
        .then(res=> dispatch({type:"FETCH_BOOK", payload: res.data}))
        .catch(err=> dispatch({type:"FETCH_BOOK_ERROR", payload: err}))
    }
}