import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
   Row, Col, Button, Modal, ModalHeader, ModalBody,
   Form, FormGroup, Input, Label } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      isCommentFormOpen: false 
    }

    this.toggleCommentForm  =  this.toggleCommentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  toggleCommentForm() {
    this.setState({
      isCommentFormOpen: ! this.state.isCommentFormOpen
    });
  }
  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
  }


  render() {
    return(
      <div>
        <div>
            <Row className='form-group'>
                <Col md={{size: 10}}>
                    <Button type="submit" outline onClick={this.toggleCommentForm}>
                      <i className="fa fa-solid fa-pencil">
                      </i>
                      Submit Comment
                    </Button>
                </Col>
            </Row>
        </div>
        <div>
          <Modal isOpen={this.state.isCommentFormOpen} toggle={this.toggleCommentForm}>
            <ModalHeader toggle={this.toggleCommentForm}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={this.handleSubmit}>
                <Row> 
                  <Label md={12}>Rating</Label>
                  <Col md={12} >
                    <Control.select model='.rating' id='rating' name='rating' className='form-control'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row>
                  <Label htmlFor='yourname' md={12}>Your Name</Label>
                  <Col md={12}>
                    <Control.text model='.yourname' id='yourname' name='yourname'
                        placeholder='Your Name' className='form-control'
                        validators={{
                          required, minLength: minLength(3), maxLength: maxLength(15)
                        }}
                      />
                    <Errors
                        className="text-danger"
                        model=".yourname"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                    />                    
                  </Col>
                </Row>
                <Row>
                  <Label htmlFor="message" md={12}>Comment</Label>
                  <Col md={12}>
                    <Control.textarea model=".message" id="message" name="message"
                          rows="6" className='form-control'/>
                  </Col>
                </Row>
                <Row className='m-2'>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </Row>  

              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

  function RenderDish({dish}) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} value={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  function RenderComments({comments}) {
    if (comments != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US',
                     {year: 'numeric', month: 'short', date: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
          <CommentForm />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  const DishDetail = (props) => {
    if (props.dish != null) {
      return (
        <div className="container">
          <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr/>
              </div>
          </div>
        
          <div className="row">
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments}/>
            {/* <CommentForm /> */}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }


export default DishDetail;