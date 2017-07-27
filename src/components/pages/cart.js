"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component{
    constructor(){
        super();
        this.state ={ 
            showModal: false
        }
    }

    toggleModal(){
        this.state.showModal === true ? this.setState({showModal: false}) : this.setState({showModal: true});
    }
    
    
    onDelete(_id){
        const currentCart = this.props.cart;
        const indexToDel = currentCart.findIndex(x => x._id === _id);
        let cartAfterDelete = [...currentCart.slice(0, indexToDel), ...currentCart.slice(indexToDel+1)];
        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
        this.props.updateCart(_id, 1);
    }
    onDecrement(_id, quantity){
        if (quantity > 1){
            this.props.updateCart(_id, -1);
        }
    }
    
    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        }
        else {
            return this.renderEmpty();
        }
    }
    renderEmpty(){
        return <div>
            
        </div>
    }

    renderCart(){
        const cartItemList = this.props.cart.map(x => {
                return(
                    <Panel key={x._id}>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h6>
                                    {x.title}
                                </h6>
                                <span>
                                        
                                </span>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>
                                    {x.price} USD
                                </h6>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>
                                    qty
                                    <Label bsStyle="success">
                                        {x.quantity}
                                    </Label>
                                </h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup style={{minWidth: '300px'}}>
                                    <Button onClick={(e)=>this.onDecrement(x._id, x.quantity, e)} bsStyle="default" bsSize="small">
                                        -
                                    </Button>
                                    <Button onClick={(e)=>this.onIncrement(x._id, e)} bsStyle="default" bsSize="small">
                                        +
                                    </Button>
                                    <span>
                                             
                                    </span>
                                    <Button onClick={(e)=>this.onDelete(x._id,e)} bsStyle="danger" bsSize="small">
                                        DELETE
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel>
                )
            })

        return(      
            <div>
                <Panel header="Cart" bsStyle="primary">
                    {cartItemList}
                    <Row>
                        <Col>
                            <h6>
                                Total amount: {this.props.totalAmount}
                            </h6>
                            <Button onClick={this.toggleModal.bind(this)} bsStyle="success" bsSize="small">
                                Check Out
                            </Button>
                            <Modal show={this.state.showModal} onHide={this.toggleModal.bind(this)}>
                                <Modal.Header>
                                    <Modal.Title>Check out</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h6>
                                        Your order has been saved
                                    </h6>
                                    <p>
                                        yeaaah nah
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <p> Total Amount: {this.props.totalAmount} </p>
                                    <Button onClick={this.toggleModal.bind(this)}>Close</Button>
                                    <Button bsStyle='primary'>Save changes</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Panel>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);