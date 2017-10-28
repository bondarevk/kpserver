import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
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

class Signup extends Component {
  handleFormSubmit({ username, email, password }) {
    this.props.signUpUser({ username, email, password });
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
        <Field name="email" label="Почта" component={renderField} type="email" />
        <Field name="password" label="Пароль" component={renderField} type="password" />
        <Field name="passwordConfirm" label="Повторите Пароль" component={renderField} type="password" />
        <button action="submit" className="btn btn-primary">Sign up</button>
        {this.renderAlert()}
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Пароли не совпадают';
  }

  if (!formProps.username) {
    errors.username = 'Введите логин';
  }

  if (!formProps.email) {
    errors.email = 'Введите почту';
  }

  if (!formProps.password) {
    errors.password = 'Введите пароль';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Введите пароль';
  }

  return errors;
}

Signup = reduxForm({
  form: "signup",
  validate
})(Signup);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Signup);