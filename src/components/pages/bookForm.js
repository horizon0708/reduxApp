"use strict"

import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {createBook} from '../../actions/bookActions';

class BookForm extends React.Component{
    handleSubmit(){
        const book= [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value,
        }]
        this.props.createBook(book);
    }
    
    render(){
        return(
            <Well>
                <Panel>
                    <FormGroup controlid="title">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder="Enter Title"
                                ref="title" />
                    </FormGroup>
                     <FormGroup controlid="description">
                            <ControlLabel>Description</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder="Enter description"
                                ref="description" />
                    </FormGroup>
                     <FormGroup controlid="price">
                            <ControlLabel>Price</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder="Enter Price"
                                ref="price" />
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary"> Save! </Button>
                </Panel>
            </Well>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({createBook}, dispatch);
}

export default connect(null, mapDispatchToProps)(BookForm);