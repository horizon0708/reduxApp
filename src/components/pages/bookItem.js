import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends React.Component {
    constructor(){
        super();
        this.state ={
            isClicked: false
        }
    }

    onReadMore(){
        this.setState({isClicked:true})
    }

    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }]
        //check if cart is empty
        if (this.props.cart.length > 0) {
            let _id = this.props._id;
            let cartIndex = this.props.cart.findIndex(x => x._id === _id);
            if (cartIndex === -1) {
                this.props.addToCart(book);
            } else {
                this.props.updateCart(_id, 1, this.props.cart);
            }
        } else {
            this.props.addToCart(book);
        }
    }

    render() {
        return (
            <Well>
                <Row>
                    <Col xs={6} sm={5}>
                        <Image style={{paddingTop: "12px"}} src={"images/"+ this.props.images} responsive />
                    </Col>
                    <Col xs={6} sm={7} >
                        <h4>{this.props.title}</h4>
                        <p>by {this.props.author}</p>
                        <p>{this.props.description.length > 50 && this.state.isClicked === false ? 
                            this.props.description.substring(0, 50): this.props.description}
                            <button className='link' onClick={this.onReadMore.bind(this)}>
                                {this.state.isClicked === false && this.props.description !== null 
                                && this.props.description.length > 50 ? ('... read more'): '' }
                                </button>
                            </p>
                        <p><strong>{this.props.price} schmeckles</strong></p>
                        <Button style={{float: "right"}}onClick={this.handleCart.bind(this)} bsStyle='primary' bsSize='small'> Add to Cart</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);