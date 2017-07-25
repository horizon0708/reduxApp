"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBook } from '../../actions/bookActions';

class BooksList extends React.Component {
    componentDidMount() {
        this.props.getBook();
    }
    
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({getBook: getBook}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);