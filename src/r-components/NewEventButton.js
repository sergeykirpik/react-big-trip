import React from 'react';

export default class NewEventButton extends React.Component {
  render() {
    return (
      <button 
        className="trip-main__event-add-btn  btn  btn--big  btn--yellow" 
        type="button"
        onClick={this.props.onClick}
        >
        New event
      </button>
    );
  }
}
