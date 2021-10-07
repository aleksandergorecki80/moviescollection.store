import React from 'react';
import axios from 'axios';
import FilmsList from './FilmsList';

class SearchForFilmData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      moviesList: '',
      page: 1,
    };
  }
  onHandleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmitHandler = (event) => {
    event && event.preventDefault();
    this.setState({
      page: 1,
    });
    this.state.title && this.fetchFromOmdb();
  };
  onNextPreviousPage = (value) => {
    this.setState((prevState) => {
      return { page: prevState.page + value };
    });
  };
  fetchFromOmdb = () => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${this.state.title.trim()}&apikey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}`, 
      )
      .then((res) => {
        const movies = res.data.Search;
        this.setState({
          moviesList: movies,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidUpdate(prevProps, prevState) {
    this.state.page !== prevState.page && this.fetchFromOmdb();
  }
  render() {
    return (
      <div className="content search">
        <form onSubmit={this.onSubmitHandler} className="form-content">
          <input
            name="title"
            type="text"
            placeholder="Search Movie in OMDB"
            onChange={this.onHandleChange}
          />
          <input type="submit" value="Search" className="btn btn-add" />
        </form>
        {this.state.moviesList ? (
          <FilmsList moviesList={this.state.moviesList} />
        ) : (
          <p>Nothing to display</p>
        )}
        <div className="pagination">
          {this.state.moviesList && this.state.page > 1 && (
            <button
              className="btn btn-pagination"
              onClick={() => {
                this.onNextPreviousPage(-1);
              }}
            >
              Previous Page
            </button>
          )}
          {this.state.moviesList && this.state.moviesList.length >= 10 && (
            <button
              className="btn btn-pagination"
              onClick={() => {
                this.onNextPreviousPage(1);
              }}
            >
              Next Page
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default SearchForFilmData;
