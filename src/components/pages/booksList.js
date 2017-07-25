"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBook } from '../../actions/bookActions';
import BookItem from './bookItem';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import BookForm from './bookForm';


class BooksList extends React.Component {
    componentDidMount() {
        this.props.getBook();
    }
    
    render() {
        const booksList = this.props.books.map( x => {
            return(
                <Col xs={12} sm={6} md={4} key={x.id}>
                    <BookItem 
                        id= {x.id}
                        title = {x.title}
                        description = {x.description}
                        price ={x.price}/>
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={6}>
                        <BookForm />

                    </Col>
                        {booksList}
                </Row>
            </Grid>
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