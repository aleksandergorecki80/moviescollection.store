import React, { useState } from 'react';
import SearchForFilmData from './filmsFromOmdb/SearchForFilmData';
import FilmForm from './FilmForm';

const AddNewFilm = (props) => {
  const [addingMethod, setAddingMethod] = useState('search');

  if (addingMethod) {
    return (
      <div className="content">
        <button
          onClick={() => {
            setAddingMethod('');
          }}
          className="btn btn-add"
        >
          Switch to: Add data manually
        </button>
        <SearchForFilmData />
      </div>
    );
  } else {
    return (
      <div className="content">
        <button
          onClick={() => {
            setAddingMethod('search');
          }}
          className="btn btn-add"
        >
          Switch to: Serach in OMDb
        </button>
        <FilmForm {...props} />
      </div>
    );
  }
};

export default AddNewFilm;
