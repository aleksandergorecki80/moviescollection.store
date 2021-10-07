import React from 'react';
import { connect } from 'react-redux';
import { addImportedFilm } from '../../actions/importedFilmActions';
import { Link } from 'react-router-dom';
import NoImage from '../../img/no-image.svg';

const Film = (props) => {
  const onClickHandle = () => {
    props.addImportedFilm(props.movie);
  };
  return (
    <div className="thumbnail">
      {props.movie.Poster !== 'N/A' ? (
        <img
          src={props.movie.Poster}
          alt="poster"
          className="thumbnail-cover"
        />
      ) : (
        <img
          src={NoImage}
          alt="No poster available"
          className="thumbnail-cover"
        />
      )}
      {`${props.movie.Title}`}
      <Link
        to="/confirm_data"
        onClick={onClickHandle}
        className="btn btn-add a-no-underline"
      >
        Add to my collection
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImportedFilm: (film) => {
      dispatch(addImportedFilm(film));
    },
  };
};

export default connect(null, mapDispatchToProps)(Film);
