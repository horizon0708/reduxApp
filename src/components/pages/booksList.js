"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBook } from '../../actions/bookActions';
import BookItem from './bookItem';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';
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
                        description={x.description}
                        images={x.images}
                        price={x.price} />
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={300} height={100} alt="900x500" src="/images/lovelive.png" />
                            <Carousel.Caption>
                                <h3>Love Live</h3>
                                <p>DO you Love Love Live?</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={300} height={100} alt="900x500" src="/images/despair.jpg" />
                            <Carousel.Caption>
                                <h3>Marika</h3>
                                <p>2nd best grill after Haru.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row style={{margineTop: '15px'}}>
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