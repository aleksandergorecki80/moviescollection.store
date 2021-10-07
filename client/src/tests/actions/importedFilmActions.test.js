import { addImportedFilm } from '../../actions/importedFilmActions';

describe('Tests for a imported films from DBI', () => {
  test('Should setup add a imported film from external API', () => {
    const film = {
      title: 'The Matrix',
      year: '1999',
      posterName:
        'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    };
    const action = addImportedFilm(film);
    expect(action).toEqual({
      type: 'ADD_IMPORTED_FILM', 
      film: {
          title: 'The Matrix',
          year: '1999',
          posterName:
            'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', 
      }
    })
  });
});

