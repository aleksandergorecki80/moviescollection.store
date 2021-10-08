import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Modal from './components/Modal';
import Header from './components/Header';
import FilmList from './components/FilmList';
import SearchForFilmData from './components/filmsFromOmdb/SearchForFilmData';
import FilmForm from './components/FilmForm';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import FilmDetails from './components/FilmDetails';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const newHistory = createBrowserHistory();

const initialState = {};
const middlewares = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

class App extends React.Component {
  state = {
    showModal: false,
    logInStatus: false,
    userName: '',
  };

  setShowModal = (value) => {
    this.setState({
      showModal: value,
    });
  };
  render() {
    return (
      <div className="App container">
        <Provider store={store}>
          <Router history={newHistory}>
            {this.state.showModal && <Modal setShowModal={this.setShowModal} history={newHistory} />}
            <Header
              showModal={this.state.showModal}
              setShowModal={this.setShowModal}
              history={newHistory}
              logInStatus={this.state.logInStatus}
              userName={this.state.userName}
            />
            <Switch>
              <Route exact path="/" component={FilmList} />
              <Route path="/search_film" component={SearchForFilmData} />
              <Route path="/add_film" component={FilmForm} />
              <Route path="/film/:id" component={FilmDetails} />
              <Route path="/editfilm/:id" component={FilmForm} />
              <Route path="/confirm_data" component={FilmForm} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
