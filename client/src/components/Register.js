import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import bcryptjs from 'bcryptjs';

class Register extends React.Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      repeat_password: '',
    },
    regExPatterns: {
      name: /^[a-z\d]{5,25}$/i, // d - meta character for digit
      //eslint-disable-next-line
      email: /^([a-z\d\.-]+)@([a-z\d\.-]+)\.([a-z]{2,8})(\.[a-z]{5,50})?$/,
      password: /^[\w@-]{8,20}$/i, // w - any character a-z, A-Z, 0-9, including the _
    },
    messages: {
      name:
        'Username must be alphanumeric and be 5-25 characters long with no spaces.',
      email: 'Email must be a valid adress, e.g. me@mydomain.com',
      password:
        'Password must be alphanumeric (@ _ - are allowed) and be 8-20 characters long with no spaces.',
      repeat_password: 'Confirm password field must match the password.',
    },
    errorMessages: [],
  };

  onChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      },
    });
  };

  validateName = () => {
    return this.state.regExPatterns.name.test(this.state.user.name);
  };

  validateEmail = () => {
    return this.state.regExPatterns.email.test(this.state.user.email);
  };

  validatePasswords = () => {
    return this.state.regExPatterns.password.test(this.state.user.password);
  };

  validateRepeatPassword = () => {
    return this.state.user.password === this.state.user.repeat_password;
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

  getHash = () => {
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(this.state.user.password, salt);
    return hash;
  };

  addHashedPassword = (hashedPassword) => {
    this.setState({
      user: {
        ...this.state.user,
        hashedPassword,
      },
    });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    this.setState({
      errorMessages: [],
    });

    if (!this.validateName()) {
      this.addErrorMessage('name');
    }

    if (!this.validateEmail()) {
      this.addErrorMessage('email');
    }

    if (!this.validatePasswords()) {
      this.addErrorMessage('password');
    }

    if (!this.validateRepeatPassword()) {
      this.addErrorMessage('repeat_password');
    }

    const result =
      this.validateName() &&
      this.validateEmail() &&
      this.validatePasswords() &&
      this.validateRepeatPassword();

    if (result) {
      const hashedPassword = this.getHash();
      axios
        .post('/api/users', {
          name: this.state.user.name,
          email: this.state.user.email,
          password: hashedPassword,
        })
        .then((res) => {
          if (res.data.error) {
            return this.setState((prevState) => {
              return {
                errorMessages: [...prevState.errorMessages, res.data.error],
              };
            });
          }
          this.props.history.push({
            pathname: '/login',
            state: res.data.message,
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
      <div className="content register">
        {this.state.response}
        <form onSubmit={this.handleSubmitForm}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Enter name"
            onChange={this.onChange}
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Enter email"
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.onChange}
          />
          <input
            type="password"
            name="repeat_password"
            value={this.state.repeat_password}
            placeholder="Confirm password"
            onChange={this.onChange}
          />
          {this.state.errorMessages.map((message, key) => {
            return <p key={key}>{message}</p>;
          })}
          <input
            type="submit"
            value="Register a new user"
            className="btn btn-add"
          />
        </form>
        <div>
          Have an account? <NavLink to="/login" className="a-colored">Login</NavLink>
        </div>
      </div>
    );
  }
}

export default Register;
