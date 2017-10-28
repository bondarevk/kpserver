import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        {this.props.auth.authenticated ?
          <ul>
            Вы вошли как: {this.props.auth.username}
            <li key={1}>
              <Link to="/feature">Email</Link>
            </li>
            <li key={2}>
              <Link to="/signout">Выйти</Link>
            </li>
          </ul>
          :
          <ul>
            <li key={1}>
              <Link to="/signin">Вход</Link>
            </li>
            <li key={2}>
              <Link to="/signup">Регистрация</Link>
            </li>
          </ul>
        }
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);