import React from 'react';
import Film from './Film';
import { connect } from 'react-redux';
import { fetchFilmsFromDB } from '../actions/filmActions';

export class FilmList extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchFilmsFromDB(this.props.user.token);
    } else {
      this.props.history.push({
        pathname: '/Login'
      });
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user.token && this.props.user.token) {
      this.props.fetchFilmsFromDB(this.props.user.token);
    }
    localStorage.setItem('films', JSON.stringify(this.props.films));
  }
  render() {
    return this.props.films.length ? (
      <div className="films-list">
        {this.props.films.map((film) => {
          return <Film film={film} key={film._id} />;
        })}
      </div>
    ) : (
      <div className="empty">Your library is empty.</div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilmsFromDB: (userToken) => {
      dispatch(fetchFilmsFromDB(userToken));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    films: state.films,
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilmList);
