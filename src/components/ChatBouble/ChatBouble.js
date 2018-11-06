import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChatBouble extends Component {
  /* This will be a pretty sexy chat bouble it will have to poll the data
     from the Spring every 3 seconds i figured 3 seconds is not so bad
     but when it polls new data from the API i.e it got new chat msg
     its stops polling and lets the user know he has new msg, since we dont have 
     any load balancing this approach will do */
  
  /* 2 reason we can """COUGHT COUGHT """ come up with to use polling is
     1- Spring boot libaries are pretty bitchy to work with when making restfull api
     2- if we want other to use our api they can still use it and we dont have to give them controll over the sockets */
  static propTypes = {
    // we can use PropTypes to define what kind of json obj we want to recive
    chatroom: PropTypes.shape({
                chatroomName: PropTypes.string.isRequired,
                displayName: PropTypes.string,
                description:PropTypes.string,
                listed:PropTypes.bool,
                invited_only:PropTypes.bool,
                ownerUsername:PropTypes.string,
                created:PropTypes.number,
                lastMessageReceived:PropTypes.number,
                lastRead: PropTypes.number,
                userRelation: PropTypes.string,
              })
    }
  state = {
    timer : null,
    newdataRecived: false // tells us if new msg is here inwitch case we stop polling for the time beeing
  }

  componentDidMount() {
    this.state.timer = setInterval(()=> this.updateChat(), 3000);
  }
  componentWillUnmount() {
    this.setState({timer:null});
  }

  updateChat() {
     console.log("polling-not implemented");
  }

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