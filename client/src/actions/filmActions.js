import axios from 'axios';

export const fetchFilmsFromDB = (userToken) => {
  return (dispatch) => {
    return axios
      .get('/api/movies', {
        headers: {
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        dispatch(fetchFilmsAction(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchFilmsAction = (films) => {
  return { type: 'LOAD_FILMS', films };
};

export const removeFilm = (_id, userToken) => {
  return (dispatch) => {
    return axios
      .delete(`/api/movies/${_id}`, {
        headers: {
          'x-auth-token': userToken,
          }
        })
      .then(() => {
        dispatch(removeFilmAction(_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeFilmAction = (_id) => {
  return { type: 'REMOVE_FILM', _id };
};

export const addFilm = (film, userToken) => {
  return (dispatch, getState) => {
    axios
      .post('/api/movies', film, {
        headers: {
          'x-auth-token': userToken,
        },
      })
      .then(() => {
        dispatch(addFilmAction(film));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addFilmAction = (film) => {
  return {
    type: 'ADD_FILM',
    film,
  };
};

export const editFilm = (film, _id, userToken) => {
  return (dispatch) => {
    return axios
      .put(`/api/movies/${_id}`, film, {
        headers: {
          'x-auth-token': userToken,
        },
      })
      .then(() => {
        dispatch(editFilmAction(film, _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editFilmAction = (film, _id) => {
  return { type: 'EDIT_FILM', film, _id };
};

export const resetFilmList = () => {
  return { type: 'RESET_FILMS_LIST', films: [] };
};
