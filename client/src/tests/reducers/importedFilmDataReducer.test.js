import importedFilmDataReducer from '../../reducers/importedFilmDataReducer';

describe('Tests for imported films data reducer', () => {
    it('Should set up a default state', () => {
        const state = importedFilmDataReducer(undefined, { type: '@@INIT'});
        expect(state).toBe('');
    });
    it('Should add a imported film data to the state', () => {
        const action = { type: 'ADD_IMPORTED_FILM', film: {
            Title: 'New title',
            Year: 'Year of production',
            Poster: 'Link to the poster'
        }}; 
        const state = importedFilmDataReducer('', action);
        expect(state).toEqual({
            title: 'New title',
            year: 'Year of production',
            posterName: 'Link to the poster'
        });
    });
});