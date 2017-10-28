import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <fieldset className="form-group">
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </fieldset>
  );
};

class Signin extends Component {
  handleFormSubmit({ username, password }) {
    this.props.signInUser({ username, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="username" label="Логин" component={renderField} />
        <Field name="password" label="Пароль" type="password" component={renderField} />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Войти</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Введите логин';
  }

  if (!formProps.password) {
    errors.password = 'Введите пароль';
  }

  return errors;
}

Signin = reduxForm({
  form: 'signin',
  validate
})(Signin);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Signin);