import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {field.meta.error}
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    // handleSubmit is put onto component props by ReduxForm
    // in the same way react-redux connect adds states to props
    const { handleSubmit } = this.props;

    return (
      // handleSubmit wrapper insures this.onSubmit is called
      // only if the form passes validation
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  // errors property names need to match the field names
  if (!values.title) {
    errors.title = "Please enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Please enter some categories!";
  }
  if (!values.content) {
    errors.content = "Please enter some content!";
  }

  // If empty object is returned, form is fine to submit.
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,   // validate: validate
  form: 'PostsNewForm'
})(PostsNew);