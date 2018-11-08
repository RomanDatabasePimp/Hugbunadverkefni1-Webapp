import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Chatsection extends Component {


render() {
    return (
      
    <li className="contact">
      <div className="wrap">
        <span className="offline"></span>
        <img src="http://emilcarlsson.se/assets/charlesforstman.png" alt="" />
        <div className="meta">
          <p className="name">Big Dick 1</p>
        </div>
      </div>
    </li>
    );
  }

}