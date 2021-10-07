import { addFilmAction, removeFilmAction, editFilmAction, fetchFilmsAction } from '../../actions/filmActions';

describe('Tests for film actions', () => {
    const film = {
            title:"Matrix 3",
            format:"DVD",
            posterName:"Poster_-_The_Matrix_Reloaded.jpg",
            year: '2021',
            condition:"New"
        }
    
    it('Should set up add a new film action', ()=> {
        const action = addFilmAction(film);
        expect(action).toEqual({
            type: 'ADD_FILM', 
            film: {
                title:"Matrix 3",
                format:"DVD",
                posterName:"Poster_-_The_Matrix_Reloaded.jpg",
                year: '2021',
                condition:"New" 
            }
        })
    });
    it('Should set up a remove action object', () => {
        const action = removeFilmAction('123abc');
        expect(action).toEqual({
            type: 'REMOVE_FILM',
            _id: '123abc'
        });
    });
    it('Should set up a edit action', () => {
        const action = editFilmAction({note: 'New note value'}, '123abc');
        expect(action).toEqual({
            type: 'EDIT_FILM',
            film: {
                note: 'New note value'
            },
            _id: '123abc'
        })
    });
    it('Should set up action that save feched films', () => {
        const action = fetchFilmsAction([
            {note: 'New note value'},
            {note: 'Another note value'}
        ]);
        expect(action).toEqual({
            type: 'LOAD_FILMS',
            films: [
                {note: 'New note value'},
                {note: 'Another note value'}
            ]
        })
    });
})