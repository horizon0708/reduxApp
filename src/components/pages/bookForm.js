"use strict"

import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {createBook, deleteBook} from '../../actions/bookActions';

class BookForm extends React.Component{
    onDelete(){
        let refValue = findDOMNode(this.refs.delete).value;
        let idRegex = /:(.*?)\]/;
        let id = parseInt(idRegex.exec(refValue)[1], 10);
        this.props.deleteBook(id);
    }
    
    handleSubmit(){
        const book= [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value,
        }]
        this.props.createBook(book);
    }
    
    render(){
        const booksList = this.props.books.map(x=> <option key={x._id}>{x.title} [ID:{x._id}]</option>)
        
        return(
            <Well>
                <Panel>
                    <FormGroup controlId="title">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder="Enter Title"
                                ref="title" />
                    </FormGroup>
                     <FormGroup controlId="description">
                            <ControlLabel>Description</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder="Enter description"
                                ref="description" />
                    </FormGroup>
                     <FormGroup controlId="price">
                            <ControlLabel>Price</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder="Enter Price"
                                ref="price" />
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary"> Save! </Button>
                </Panel>
                <Panel style={{marginTop: '25px'}}>
                    <FormGroup controlId='formControlsSelect'>
                        <ControlLabel>Select a book to delete</ControlLabel>
                        <FormControl ref="delete" componentClass='select' placeholder='select'>
                            <option value='select'>select</option>
                            {booksList}
                        </FormControl>
                    </FormGroup>
                    <Button onClick={(e)=>this.onDelete(e)} bsStyle="danger">
                        Delete Book!
                    </Button>
                </Panel>
            </Well>
        )
    }
}
function mapStateToProps(state){
    return {
        books: state.books.books
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({createBook, deleteBook}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);