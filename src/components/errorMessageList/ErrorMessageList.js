import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ErrorMessageList.css';

export default class ErrorMessageList extends Component {

  static propTypes = {
    errors: PropTypes.array,
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

