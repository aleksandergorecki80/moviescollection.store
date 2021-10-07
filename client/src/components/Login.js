import { connect } from 'react-redux';
import axios from 'axios';
import React from 'react';
import { fetchUserData } from '../actions/userActions';
import { NavLink } from 'react-router-dom';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
    regExPatterns: {
      //eslint-disable-next-line
      email: /^([a-z\d\.-]+)@([a-z\d\.-]+)\.([a-z]{2,8})(\.[a-z]{5,50})?$/,
      password: /^[\w@-]{8,20}$/i, // w - any character a-z, A-Z, 0-9, including the _
    },
    messages: {
      email: 'Email must be a valid adress, e.g. me@mydomain.com',
      password:
        'Password must be alphanumeric (@ _ - are allowed) and be 8-20 characters long with no spaces.',
    },
    errorMessages: [],
  };

  onChangeHandler = (event) => {
    this.setState((prevState) => {
      return {
        user: {
          ...prevState.user,
          [event.target.name]: event.target.value,
        },
      };
    });
  };

  addErrorMessage = (property) => {
    this.setState((prevState) => {
      return {
        errorMessages: [
          ...prevState.errorMessages,
          this.state.messages[property],
        ],
      };
    });
  };

  validateEmail = () => {
    return this.state.regExPatterns.email.test(this.state.user.email);
  };

  validatePasswords = () => {
    return this.state.regExPatterns.password.test(this.state.user.password);
  };

  onSubminHandler = (event) => {
    event.preventDefault();

    this.setState({
      errorMessages: [],
    });

    if (!this.validateEmail()) {
      this.addErrorMessage('email');
    }

    if (!this.validatePasswords()) {
      this.addErrorMessage('password');
    }

    const result = this.validateEmail() && this.validatePasswords();

    if (result) {
      axios
        .post('/api/auth', this.state.user)
        .then((res) => {
          const userToken = res.headers['x-auth-token'];
          this.props.fetchUserData(userToken);
          localStorage.setItem('token', userToken);
          this.props.history.push({
            pathname: '/',
            state: res.data,
          });
        })
        .catch((err) => {
          this.setState({
            errorMessages: [
              ...this.state.errorMessages,
              err.response.data.error,
            ],
          });
        });
    }
  };

  render() {
    return (
      <div className="content login">
        <p> {this.props.location.state ? this.props.location.state : ''}</p>
        <form onSubmit={this.onSubminHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChangeHandler}
          />
          {this.state.errorMessages.map((message, key) => {
            return <p key={key}>{message}</p>;
          })}
          <input type="submit" value="Login" className="btn btn-add" />
        </form>
        <div>
          Do not have an account? <NavLink to="/register" className="a-colored">Register</NavLink>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (userToken) => {
      dispatch(fetchUserData(userToken));
    },
  };
};
export default connect(null, mapDispatchToProps)(Login);
