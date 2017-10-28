import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

  componentWillMount() {
    this.props.getEmail();
  }

  render() {
    return (
      <div>
        Email: {this.props.info.email}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.info
  };
}

export default connect(mapStateToProps, actions)(Feature);