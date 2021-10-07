import { v4 as uuidv4 } from 'uuid';

const localData = () => {
    const storage = localStorage.getItem('films')
    return storage ? JSON.parse(storage) : [];
}

const defaultState = localData();

const filmReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'LOAD_FILMS':
            return action.films
          
        case 'ADD_FILM':
            return [...state, {
                title: action.film.title,
                format: action.film.format,
                posterName: action.film.posterName,
                year: action.film.year,
                 condition: action.film.condition,
                _id: uuidv4()
            }];
        case 'REMOVE_FILM':
            return state.filter((film) => {
                return film._id !== action._id
            });
        case 'EDIT_FILM':
            return state.map((film) => {
                if(film._id === action._id){
                    return {
                        title: action.film.title,
                        format: action.film.format,
                        posterName: action.film.posterName,
                        year: action.film.year,
                        condition: action.film.condition,
                        _id: action._id
                    }} else {
                        return film
                    }
            });
        case 'RESET_FILMS_LIST':
            return action.films
        default:
            return state
    }
}

export default filmReducer;