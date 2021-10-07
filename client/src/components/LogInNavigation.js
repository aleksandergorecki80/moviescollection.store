import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUserData, logOutUser } from '../actions/userActions';
import { resetFilmList } from '../actions/filmActions';

class LogInNavigation extends React.Component {
  logOut = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('films', '');
    this.props.logOutUser();
    this.props.resetFilmList();
    this.props.history.push('/login');
  };

  componentDidMount() {
    const localToken = () => {
      const localData = localStorage.getItem('token');
      return localData ? localData : '';
    };
    const userToken = localToken();
    if (userToken) {
      this.props.fetchUserData(userToken);
    }
  }

  render() {
    const logInNavigation = !this.props.user ? (
      <div className="log-register-links">
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/Login">Log in</NavLink>
      </div>
    ) : (
      <div className="log-register-links">
        <span>{this.props.user.name}</span>
        <button className="log-out" onClick={this.logOut}>
          Log out
        </button>
      </div>
    );
    return <div>{logInNavigation}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (userToken) => {
      dispatch(fetchUserData(userToken));
    },
    logOutUser: () => {
      dispatch(logOutUser());
    },
    resetFilmList: () => {
      dispatch(resetFilmList());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogInNavigation);
