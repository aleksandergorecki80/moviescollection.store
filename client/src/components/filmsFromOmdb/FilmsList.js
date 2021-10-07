import { React } from 'react';
import Film from './Film';

const FilmsList = (props) => {
  return props.moviesList.length ? (
    <div className="films-list">
      {props.moviesList.map((movie) => {
        return <Film movie={movie} key={movie.imdbID} />;
      })}
    </div>
  ) : (
    <div>Nothing to display</div>
  );
};

export default FilmsList;
