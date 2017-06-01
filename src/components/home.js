/* eslint-disable no-unused-consts*/
/* eslint-disable no-undef*/
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { History, Link } from 'react-router';
import React, { Component } from 'react';

export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      success: null
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className="page-header">
          <h1>
            <span> Twitter</span>
            <div id="user-select"></div>
          </h1>
          this is my name
        </div>
      </div>
    );
  }

}

Home.propTypes = {
  // name: PropTypes.string.isRequired,
  // onNameChange: PropTypes.func.isRequired
};

export default connect(null, null)(Home);
