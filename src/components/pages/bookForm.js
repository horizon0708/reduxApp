"use strict"

import React from 'react';
import { MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';

import { createBook, deleteBook, getBook, resetButton } from '../../actions/bookActions';

class BookForm extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }
    componentDidMount() {
        this.props.getBook();
        axios.get('/api/images/')
            .then(response => {
                console.log(response.data)
                this.setState({ images: response.data })
            })
            .catch(err => {
                this.setState({ images: 'error loading images fro mthe server', img: '' })
            });
    }
    handleSelect(img) {
        this.setState({
            img: '/images/' + img
        })
    }

    onDelete() {
        let refValue = findDOMNode(this.refs.delete).value;
        let idRegex = /:(.*?)\]/;
        let id = idRegex.exec(refValue)[1];
        this.props.deleteBook(id);
    }

    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.images).value,
            price: findDOMNode(this.refs.price).value,
        }]
        this.props.createBook(book);
    }
    renderImages() {
        if (this.state.images) {
            return this.state.images.map((x, ind) => <MenuItem
                key={ind}
                eventKey={x.name}
                onClick={(e) => this.handleSelect(x.name, e)}>{x.name}</MenuItem>)
        }
        return <MenuItem key="1"> Loading ...</MenuItem>
    }

    resetForm() {
        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.images).value = '';
        this.setState({ img: '' })
    }

    render() {
        const booksList = this.props.books.map(x => <option key={x._id}>{x.title} [ID:{x._id}]</option>)


        return (
            <Row>
                <Col xs={12} sm={6}>
                    <Panel>
                        <InputGroup>
                            <FormControl type='text' ref="images" value={this.state.img} />
                            <DropdownButton
                                componentClass={InputGroup.Button}
                                id='input-dropdown-addon'
                                title='Select an image'
                                bsStyle="primary">

                                {this.renderImages()}
                            </DropdownButton>
                        </InputGroup>
                        <Image src={this.state.img} responsive />
                    </Panel>
                </Col>
                <Col xs={12} sm={6}>
                    <Well>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title" />
                                    <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter description"
                                    ref="description" />
                                    <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price" />
                                    <FormControl.Feedback />
                            </FormGroup>
                            <Button onClick={!this.props.msg? this.handleSubmit.bind(this): this.resetForm.bind(this)}
                                bsStyle={!this.props.style ? "primary" : this.props.style}
                            > {!this.props.msg ? "Save book" : this.props.msg}</Button>
                        </Panel>
                        <Panel style={{ marginTop: '25px' }}>
                            <FormGroup controlId='formControlsSelect'>
                                <ControlLabel>Select a book to delete</ControlLabel>
                                <FormControl ref="delete" componentClass='select' placeholder='select'>
                                    <option value='select'>select</option>
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button onClick={(e) => this.onDelete(e)} bsStyle="danger">
                                Delete Book!
                    </Button>
                        </Panel>
                    </Well>
                </Col>
            </Row>


        )
    }
}
function mapStateToProps(state) {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createBook, deleteBook, getBook, resetButton }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);