import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChatBouble extends Component {

  static propTypes = {
    chatname: PropTypes.string,
    
  }

  static defaultProps = {
    className: '',
    onClick: () => {},
  }

  render() {
    const { errors, className } = this.props;

    const classes = `error_list ${className}`

    return (
      <ul className={classes}>
      {errors.map((e, i) => 
        <li key={i}>{`${e.field}: ${e.message}`}</li>
      )}
    </ul>
    );
  }

}