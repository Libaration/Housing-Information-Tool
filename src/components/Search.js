import React, { Component } from 'react';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchData(this.state);
  };

  initializeMap = () => {};
  render() {
    return (
      <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
          />
          <br />
          <div className="buttonspacer">
            <button className="button">Search</button>
          </div>
        </form>
      </div>
    );
  }
}
