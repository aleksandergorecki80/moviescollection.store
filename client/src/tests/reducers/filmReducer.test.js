import filmReducer from '../../reducers/filmReducer';
import films from '../fixtures/films';

describe('Tests for a film reducer', () => {
    const film = {
        title: "Back to the Future",
        format: "DVD",
        condition: "New",
        year: "1985",
        posterName: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    }
    it('Should set up a default state with an empty data base', () => {
        const action = { type: '@@INIT' };
        const state = filmReducer(undefined, action);
        expect(state).toEqual([]);
    });
    it('Should add a new film to the collection', () => {

        const action = { type: 'ADD_FILM', film };
        const state = filmReducer(films, action);
        expect(state).toEqual([
            ...films, {
                ...film,
                _id: expect.any(String)
            }
        ]);
    });
    it('Should remove a film', () => {
        const action = { type: 'REMOVE_FILM', _id: films[1]._id };
        const state = filmReducer(films, action);
        expect(state).toEqual([ films[0], films[2] ]);
    });
    it('Should edit a film', () => {
        const action = { type: 'EDIT_FILM', film, _id: films[1]._id};
        const state = filmReducer(films, action);
        expect(state).toEqual([ films[0], { _id: films[1]._id , ...film }, films[2]])
    });
});