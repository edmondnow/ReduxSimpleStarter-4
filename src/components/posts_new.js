import React, { Component } from 'react';
import {Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field){
    //this is how we use destrucing to access properties on nested objects
    const { meta: { touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' :''}`
    return (
      <div className={ className }>
        <label>{field.label}</label>
        <input 
          type="text"
          className="form-control"
          //field.input object with event handler and props
          //... is fancy JSX for making sure you don't have to tie all the event handlers and props manually
          {...field.input}
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    )
  }


  onSubmit(values){
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    });
  }

  render() {
    //we are puling handle submit from this.props since this.props belongs to the state of our PostsNew form
    //handleSubmit was passed on by redux-form in the connecting function reduxForm
    const { handleSubmit } = this.props;
    return (
        //Redux form is just responsible of handling the state and validation, nothing else (no post request, no display)
        //handleSubmit takes a fu nction that you define, it will run the validation etcetara
        //reduxForm says if everything is valid we will call your callback onSubmit
        //we are calling .bind   on this since onSubmit is executed in a different scope, to make sure this is correct, you have to bind
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field 
            name="title"
            label="Title"
            component={this.renderField}
          />
          <Field 
            name="categories"
            label="Categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
    );
  }
}

function validate(values){
  //console.log(values) -> {title: 'asdf', categories: 'asdsad' , content: 'asdsafsaf'}
  const errors = {};

  //validate the inputs  from 'values'

  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories){
    errors.categories = "Enter some categories!";
  }

  if (!values.content){
    errors.content = 'Enter some content please';
  }


  //If errors is empty, the form is fine to submit
  //if errors has any propety, form is not submitted

  return errors;

}
export default reduxForm({
  form: 'PostsNewForm', //must be unique, helps render multiple forms - avoid merging states
  validate //{validate: validate }
})(
  connect(null, { createPost })(PostsNew)
); 