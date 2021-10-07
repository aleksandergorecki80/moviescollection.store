import React from 'react';
import { getYear } from 'date-fns';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerDatesArray: this.props.pickerDatesArray,
      currentSlice: 1,
      numberOfSlices: Math.ceil(
        this.props.pickerDatesArray.length / this.props.numberOfDatesOnOneSlide
      ),
      arraySlice: this.props.pickerDatesArray.slice(
        0,
        this.props.numberOfDatesOnOneSlide
      ),
      datesStart: 0,
      datesEnd: this.props.numberOfDatesOnOneSlide,
      numberOfDatesOnOneSlide: this.props.numberOfDatesOnOneSlide,
    };
  }

  previousHandler = () => {
    this.setState((prevState) => {
      return {
        currentSlice: prevState.currentSlice - 1,
        datesStart: prevState.datesStart - this.state.numberOfDatesOnOneSlide,
        datesEnd: prevState.datesEnd - this.state.numberOfDatesOnOneSlide,
      };
    });
  };

  nextHandler = () => {
    this.setState((prevState) => {
      return {
        currentSlice: prevState.currentSlice + 1,
        datesStart: prevState.datesStart + this.state.numberOfDatesOnOneSlide,
        datesEnd: prevState.datesEnd + this.state.numberOfDatesOnOneSlide,
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSlice !== this.state.currentSlice) {
      this.setState({
        arraySlice: this.state.pickerDatesArray.slice(
          this.state.datesStart,
          this.state.datesEnd
        ),
      });
    }
  }

  render() {
    return (
      <div className="year-picker-container">
        <div
          className={
            'previous ' + (this.state.currentSlice === 1 ? 'hidden' : '')
          }
          onClick={this.previousHandler}
        ></div>
        <div className="year-picker-dates">
          {this.state.arraySlice &&
            this.state.arraySlice.map((year, key) => {
              return (
                <span key={key} onClick={this.props.setPickedYear}>
                  {getYear(year)}
                </span>
              );
            })}
        </div>
        <div
          className={
            'next ' +
            (this.state.currentSlice === this.state.numberOfSlices
              ? 'hidden'
              : '')
          }
          onClick={this.nextHandler}
        ></div>
      </div>
    );
  }
}

export default DatePicker;
