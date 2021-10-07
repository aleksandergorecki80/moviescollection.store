const importedFilmDataReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_IMPORTED_FILM':
      return {
        title: action.film.Title,
        year: action.film.Year,
        posterName: action.film.Poster,
      };
    default:
      return state;
  }
};

export default importedFilmDataReducer;
