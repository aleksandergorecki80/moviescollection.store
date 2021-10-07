import React from 'react';

class ConfirmData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.importedData.title,
      year: this.props.importedData.year,
    };
  }
  onChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.props.importedData.title) {
      this.setState({
        title: this.props.importedData.title,
        year: this.props.importedData.year,
      });
    }
  }
  onCancelHandler = () => {
    this.setState({
      title: '',
      year: '',
    });
  };
  render() {
    return (
      <div>
        <p>confirm data</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Film title"
            value={this.state.title}
            onChange={this.onChange}
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Year"
            value={this.state.year}
            onChange={this.onChange}
            name="year"
          />
          <input type="submit" value="Save" />
          <button onClick={this.onCancelHandler}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default ConfirmData;
