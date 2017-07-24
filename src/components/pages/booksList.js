"use strict"

import React from 'react';
import { connect } from 'react-redux';

class BooksList extends React.Component {
    render() {
        const booksList = this.props.books.map( x => {
            return(
             <div key={x.id}>
                    <p>title: {x.title}</p>
                    <p>description: {x.description}</p>
                    <p>price: {x.price}</p>
                 </div>
            )
        })
        return (
            <div>
                <h1>Hello React</h1>
                {booksList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

export default connect(mapStateToProps)(BooksList);