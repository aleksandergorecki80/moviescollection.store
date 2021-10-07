import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFilm } from '../actions/filmActions';
import { Link } from 'react-router-dom';

const FilmDetails = (props) => {
  const [film, setFilm] = useState('');
  useEffect(() => {
    const film = props.films.find((film) => {
      return film._id === props.match.params.id;
    });
    film ? setFilm(film) : props.history.push('/');
  }, [props.films, props.history, props.match.params.id]);

  const onHandleDelete = () => {
    return props.removeFilm(film._id, props.user.token);
  };

  return (
    <div>
      <div className="film-details">
        <p>
          {film.posterName !== undefined &&
          film.posterName.startsWith('https://') ? (
            <img src={film.posterName} alt="cover" />
          ) : (
            <img src={`../${film.posterName}`} alt="cover" />
          )}
        </p>
        <h2>
          {film.title} - ({film.year})
        </h2>
        <h3>Format: {film.format}</h3>
        <h3>Condition: {film.condition}</h3>
        <button onClick={onHandleDelete} className="btn btn-delete">
          Delete{' '}
        </button>

        <Link
          to={`/edit_film/${props.match.params.id}`}
          className="a-no-underline btn btn-edit"
        >
          {/* <button className="btn btn-delete"> */}
          Edit
          {/* </button> */}
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFilm: (_id, userToken) => {
      dispatch(removeFilm(_id, userToken));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    films: state.films,
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails);
