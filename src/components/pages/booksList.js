"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBook } from '../../actions/bookActions';
import BookItem from './bookItem';
import { Jumbotron, Grid, Col, Row, Button } from 'react-bootstrap';
import BookForm from './bookForm';
import Cart from './cart';


class BooksList extends React.Component {
    componentDidMount() {
        this.props.getBook();
    }

    render() {
        const booksList = this.props.books.map(x => {
            return (

                <Col xs={12} sm={6} md={4} key={x._id}>
                    <BookItem
                        _id={x._id}
                        title={x.title}
                        author={x.author}
                        description={x.description}
                        images={x.images}
                        price={x.price} />
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Col xs={12} style={{marginTop: "20px"}}>
                        <Jumbotron>
                        <h1>Hello, world!</h1>
                        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <p><Button bsStyle="primary">Learn more</Button></p>
                    </Jumbotron>
                    </Col>
                    
                </Row>
                <Row style={{ margineTop: '15px' }}>
                    <Col>
                        {booksList}

                    </Col>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getBook: getBook }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);