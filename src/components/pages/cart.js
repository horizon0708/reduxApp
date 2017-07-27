"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem} from '../../actions/cartActions';

class Cart extends React.Component{
    onDelete(_id){
        console.log("pressed");
        const currentCart = [...this.props.cart];
        const indexToDel = currentCart.findIndex(x => x._id === _id);
        let cartAfterDelete = [[...currentCart.slice(0, indexToDel)],[...currentCart.slice(indexToDel+1)]];

        this.props.deleteCartItem(cartAfterDelete);
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
                                        
                                    </Label>
                                </h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup style={{minWidth: '300px'}}>
                                    <Button bsStyle="default" bsSize="small">
                                        -
                                    </Button>
                                    <Button bsStyle="default" bsSize="small">
                                        +
                                    </Button>
                                    <span>
                                             
                                    </span>
                                    <Button onClick={this.onDelete.bind(this, x._id)} bsStyle="danger" bsSize="small">
                                        DELETE
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel>
                )
            }, this)

        return(      
            <div>
                <Panel header="Cart" bsStyle="primary">
                    {cartItemList}
                </Panel>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem: deleteCartItem
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);