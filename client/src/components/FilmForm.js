import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFilm } from '../actions/filmActions';
import { editFilm } from '../actions/filmActions';
import DatePicker from './DatePicker';
import { eachYearOfInterval, getYear } from 'date-fns';
import axios from 'axios';

class FilmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posterFile: '',
      openPicker: false,
      pickerDatesArray: [],
      errorMessage: '',
      film: {
        title: this.props.film ? this.props.film.title : '',
        format: this.props.film ? this.props.film.format : 'unknown',
        condition: this.props.film ? this.props.film.condition : '',
        year: this.props.film ? this.props.film.year : '',
        posterName: this.props.film ? this.props.film.posterName : '',
      },
      validateErrors: {
        titleError: '',
        yearError: '',
        formatError: '',
      },
    };
  }

  // VALIDATION PATTERNS

  validateTitle = (title) => {
    const reg = /^[\s0-9a-z?!-:@]{2,255}$/i;
    return reg.test(title);
  };
  validateYear = (year) => {
    return (
      year >= getYear(new Date(process.env.REACT_APP_DATE_START)) &&
      year <= getYear(new Date())
    );
  };

  validateFormat = () => {
    return this.state.film.format !== 'unknown';
  };

  // SUBMIT
  handleSubmit = (event) => {
    event.preventDefault();

    // VALIDATION
    if (!this.validateTitle(this.state.film.title)) {
      return this.setState({
        validateErrors: {
          ...this.state.validateErrors,
          titleError: 'Wrong title format',
        },
      });
    }
    if (!this.validateYear(this.state.film.year)) {
      return this.setState({
        validateErrors: {
          ...this.state.validateErrors,
          yearError: `The year must be between ${getYear(
            new Date(process.env.REACT_APP_DATE_START)
          )} and ${getYear(new Date())}`,
        },
      });
    }
    if (!this.validateFormat()) {
      return this.setState({
        validateErrors: {
          ...this.validateErrors,
          formatError: 'Please select format',
        },
      });
    }

    // VALIDATION SUCCESFUL
    if (this.props.match.params.id) {
      this.props.editFilm(this.state.film, this.props.match.params.id, this.props.user.token);
      this.props.history.push('/');
    } else {
      this.props.addFilm(this.state.film, this.props.user.token);
      this.props.history.push('/');
    }
  };

  onChange = (event) => {
    this.setState({
      film: {
        ...this.state.film,
        [event.target.name]: event.target.value,
      },
    });
  };

  openPickerHandler = () => {
    const interval = {
      start: new Date(process.env.REACT_APP_DATE_START),
      end: new Date(),
    };
    const datesArray = eachYearOfInterval(interval);
    this.setState({
      openPicker: true,
      pickerDatesArray: datesArray.reverse(),
    });
  };

  closePickerFunction = (event) => {
    if (event.keyCode === 27) {
      this.setState({
        openPicker: false,
      });
    }
  };

  setPickedYear = (event) => {
    this.setState({
      openPicker: false,
      film: {
        ...this.state.film,
        year: event.target.innerText,
      },
    });
  };

  onHanleFile = (event) => {
    const formData = new FormData();
    formData.append('posterFile', event.target.files[0]);
    const userToken = localStorage.getItem('token');
    axios
      .post('/api/movies/upload', formData, {
        headers: {
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        this.setState({
          errorMessage: '',
          film: {
            ...this.state.film,
            posterName: res.data.filename,
          },
        });
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.message,
        });
      });
  };

  componentDidMount() {
    // EDITION OF EGZISTING FILM
    if (this.props.match.params.id) {
      const film = this.props.films.find((film) => {
        return film._id === this.props.match.params.id;
      });
      film
        ? this.setState({
            film: {
              title: film.title,
              format: film.format,
              condition: film.condition,
              year: film.year,
              posterName: film.posterName,
            },
          })
        : this.props.history.push('/');
    }
    // CONFIRMING DATA OF FILM IMPORTED FROM OMDB API
    if (this.props.match.path === '/confirm_data') {
      this.setState({
        film: {
          ...this.state.film,
          title: this.props.importedData.title,
          year: this.props.importedData.year,
          posterName: this.props.importedData.posterName,
        },
      });
    }
    // LISTENING FOR ESC
    document.addEventListener('keydown', this.closePickerFunction, false);
  }

  render() {
    const displayPoster = () => {
      return !this.state.film.posterName.startsWith('https://') ? (
        <img src={`${this.state.film.posterName}`} alt="cover" />
      ) : (
        <img src={this.state.film.posterName} alt="cover" />
      );
    };

    const pleaseRegisterLoginMessage = () => {
      return (
        <p>
          Please <NavLink to="/Login">Log in</NavLink> or{' '}
          <NavLink to="/register">Register</NavLink>
        </p>
      );
    };

    return (
      <div className="content add-and-edit">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Film title"
            value={this.state.film.title}
            onChange={this.onChange}
            name="title"
            required
          />
          {this.state.validateErrors.titleError && (
            <p className="validate-error">
              {this.state.validateErrors.titleError}
            </p>
          )}
          <div>
            <input
              type="text"
              placeholder="Year"
              value={this.state.film.year}
              onChange={this.onChange}
              name="year"
              onClick={this.openPickerHandler}
              maxLength="4"
            />
            {this.state.validateErrors.yearError && (
              <p className="validate-error">
                {this.state.validateErrors.yearError}
              </p>
            )}
            {this.state.openPicker && (
              <DatePicker
                setPickedYear={this.setPickedYear}
                defaultYear={this.state.film.year}
                pickerDatesArray={this.state.pickerDatesArray}
                numberOfDatesOnOneSlide={25}
              />
            )}
          </div>
          <select
            value={this.state.film.format}
            onChange={this.onChange}
            name="format"
            required
          >
            <option value="unknown" disabled required>
              -- select a format --
            </option>
            <option value="DVD">DVD</option>
            <option value="BluRey">BluRey</option>
          </select>
          {this.state.validateErrors.formatError && (
            <p className="validate-error">
              {this.state.validateErrors.formatError}
            </p>
          )}
          <div className="radio-group">
            <input
              id="new"
              name="condition"
              type="radio"
              value="New"
              checked={this.state.film.condition === 'New'}
              onChange={this.onChange}
            />
            <label htmlFor="new">New</label>
            <input
              id="used"
              name="condition"
              type="radio"
              value="Used"
              checked={this.state.film.condition === 'Used'}
              onChange={this.onChange}
            />
            <label htmlFor="used">Used</label>
          </div>
          <div className="poster">
            <input type="file" onChange={this.onHanleFile} id="upload-poster" />
            <label htmlFor="upload-poster" className="">
              Upload file
            </label>
          </div>
          <div className="img-column">
            {this.state.film.posterName && displayPoster()}
            {this.state.errorMessage && (
              <p className="error-message">{this.state.errorMessage}</p>
            )}
          </div>
          {this.props.user.token ? (
            !this.props.match.params.id ? (
              <input type="submit" value="Save film" className="btn btn-add" />
            ) : (
              <input
                type="submit"
                value="Update film"
                className="btn btn-add"
              />
            )
          ) : (
            pleaseRegisterLoginMessage()
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFilm: (film, userToken) => {
      dispatch(addFilm(film, userToken));
    },
    editFilm: (film, id, userToken) => {
      dispatch(editFilm(film, id, userToken));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    films: state.films,
    importedData: state.importedData,
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilmForm);
