"use strict"

import React from 'react';
import { MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import { fetchBook, createBook, deleteBook, getBook, resetButton } from '../../actions/bookActions';

import Dropzone from 'react-dropzone';
import FormData from 'form-data';


class BookForm extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [{}],
            currentBook: '',
            isEditing: false,
            priceValidation: null
        }
    }
    onDrop(acc) {
        this.setState({ img: acc[0] });
    }

    onAdd() {
        this.state.isEditing === false ? uploadFile(this.state.img) : null;
    }

    onEdit(){
        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.book !== nextProps.book) {
            console.log(nextProps.book);
            this.setState({ currentBook: nextProps.book }, () => {
                this.populateForm();
            });
        }
    }

    priceValidation() {
        let refValue = findDOMNode(this.refs.price).value;
        var regex = /^[0-9]+$/;
        if (refValue === '') {
            this.setState({priceValidation: null})
        } else {
            if (refValue.match(regex)) {
                this.setState({ priceValidation: "success" });
            }
            else {
                this.setState({ priceValidation: "error" });
            }
        }

    }

    handleChange() {
        let refValue = findDOMNode(this.refs.bookSelect).value;
        let idRegex = /:(.*?)\]/;
        if (idRegex.exec(refValue) === null) {
            console.log('setting img to zero')
            this.setState({
                currentBook: '',
                isEditing: false
            },()=>{
                this.resetForm();
            });
        } else {
            let id = idRegex.exec(refValue)[1];
            console.log('fetching book')
            this.props.fetchBook(id);
            
        }
    }

    uploadFile(acc) {
        var file = new FormData();
        file.append('image', acc[0])
        axios.post('/api/upload/', file)
            .then(response => {
                const data = response.data;
                const filename = data.filename;
                this.createBook(filename);
            })
            .catch(err => {
                console.log(err);
            })
    }

    createBook(imagePath) {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: imagePath,
            price: findDOMNode(this.refs.price).value,
        }]
        this.props.createBook(book);
    }

    componentDidMount() {
        this.props.getBook();
        axios.get('/api/images/')
            .then(response => {
                this.setState({ images: response.data })
            })
            .catch(err => {
                this.setState({ images: 'error loading images fro mthe server', currentBook: '' })
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
        findDOMNode(this.refs.author).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
    }

    populateForm() {
        if (this.state.currentBook) {
            findDOMNode(this.refs.title).value = this.state.currentBook.title;
            findDOMNode(this.refs.author).value = this.state.currentBook.author;
            findDOMNode(this.refs.description).value = this.state.currentBook.description;
            findDOMNode(this.refs.price).value = this.state.currentBook.price;
        }
    }

    renderPreview() {
        if (this.props.book) {
            console.log(this.props.book);
            return <Image src={this.state.currentBook ? "images/" + this.state.currentBook.images : null} responsive />
        }
    }

    render() {
        const booksList = this.props.books.map(x => <option key={x._id}>{x.title} [ID:{x._id}]</option>)


        return (
            <Row>
                <Col>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Well>
                                <Panel>
                                    <FormGroup controlId='formControlsSelect'>
                                        <ControlLabel>Select a book to delete</ControlLabel>
                                        <FormControl onChange={this.handleChange.bind(this)} ref="bookSelect" componentClass='select' placeholder='select'>
                                            <option value='select'> Create a new book </option>
                                            {booksList}
                                        </FormControl>
                                    </FormGroup>
                                </Panel>
                            </Well>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Well>
                                <Panel>
                                    <Dropzone
                                        onDrop={this.onDrop.bind(this)}
                                        multiple={false}>
                                        <div>Try dropping some files here, or click to select files to upload.</div>
                                        <Image src={this.state.currentBook.preview} responsive />
                                        {this.renderPreview()}
                                    </Dropzone>

                                </Panel>
                            </Well>

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
                                    <FormGroup controlId="author" validationState={this.props.validation}>
                                        <ControlLabel>Author</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter Author"
                                            ref="author" />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup controlId="description">
                                        <ControlLabel>Description</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Enter description" ref="description" style={{ height: "250px" }} />
                                    </FormGroup>
                                    <FormGroup controlId="price" validationState={this.state.priceValidation}>
                                        <ControlLabel>Price</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter a fair and reasonable price"
                                            ref="price"
                                            onChange={this.priceValidation.bind(this)} />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <Button onClick={this.state.currentBook ? this.onEdit.bind(this) : this.onAdd.bind(this)}
                                        bsStyle={this.state.currentBook ? "primary" : "info"}
                                    > {this.state.currentBook ? "Edit book" : "Create new book"}</Button>
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
        validation: state.books.validation,
        book: state.books.curBook
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBook, createBook, deleteBook, getBook, resetButton }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);