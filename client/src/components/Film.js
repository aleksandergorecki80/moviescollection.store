import { React } from 'react';
import { Link } from 'react-router-dom';

const Film = (props) => {
  return (
    <div className="thumbnail">
      <Link to={`/film/${props.film._id}`}>
        {props.film.posterName !== undefined &&
        props.film.posterName.startsWith('https://') ? (
          <img
            src={props.film.posterName}
            alt="cover"
            className="thumbnail-cover"
          />
        ) : (
          <img
            src={`${props.film.posterName}`}
            alt="cover"
            className="thumbnail-cover"
          />
        )}
        <p>{props.film.title}</p>
      </Link>
    </div>
  );
};

export default Film;
