import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pollChat  } from '../../actions/chatBoublePolling';
import { openNewChat } from '../../actions/opennewchat';
import { logoutUser  } from '../../actions/userActions';

class ChatBouble extends Component {
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
    chatroomName: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    lastMessageReceived:PropTypes.number,
    lastRead: PropTypes.number
  }

  state = {
    timer : null,
    lastReadState : null,
  }

  componentDidMount() {
    this.state.timer = setInterval(()=> this.updateChat(), 3000);
  }
  componentWillUnmount() {
    this.setState({timer:null});
  }

  updateChat() {
    const { dispatch,chatroomName } = this.props;
    dispatch(pollChat(chatroomName));
  }

  openNewChat() {
    const { dispatch,chatroomName,displayName,lastMessageReceived } = this.props;
    this.state.lastReadState = lastMessageReceived;
    dispatch(openNewChat(chatroomName,displayName))
  }

  callLogout() {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

render() {
    const {displayName,lastRead,lastMessageReceived,chatPollRoom,chatPollErr} = this.props;
    const {lastReadState} = this.state;
    // if the user has read the las,t msg we display the offline logo
    // else we show that he is oline
    let chatNewMsg;
    if(chatPollErr) { this.callLogout(); }
   
    if(chatPollRoom && chatPollRoom.lastMessageReceived) {
      
      chatNewMsg  = lastRead > chatPollRoom.lastMessageReceived? "online" : "offiline";
    } else {
      if(lastReadState) {
        chatNewMsg  = lastRead > lastReadState? "online" : "offiline";
      } else {
        chatNewMsg  = lastRead > lastMessageReceived? "online" : "offiline";
      }
    }

    return (
      <div className="wrap"  onClick={this.openNewChat.bind(this)}>
        <span className={chatNewMsg}></span>
        <img src="/img/wow.png" alt="the very wow logo" />
        <div className="meta">
          <p className="name">{displayName}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chatPollErr : state.chatBoublePolling.msg,
    chatPollRoom : state.chatBoublePolling.chatroom
  }
}
export default connect(mapStateToProps)(ChatBouble);
  