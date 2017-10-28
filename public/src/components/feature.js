import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';

class Feature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '***'
    };
  }

  componentWillMount() {
    axios.post('http://localhost:3090/getemail', {}, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        this.setState({
          email: response.data.email
        })
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.error);
        } else {
          console.log(error);
        }
      });
  }

  render() {
    return (
      <div>
        Email: {this.state.email}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(Feature);