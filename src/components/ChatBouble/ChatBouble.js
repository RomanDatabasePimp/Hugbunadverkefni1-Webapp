import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openNewChat } from '../../actions/opennewchat';
import { logoutUser  } from '../../actions/userActions';
import { noDataRequest } from '../../api';
import { EROFS } from 'constants';
import {Modal} from 'react-bootstrap';
import ChatroomForm from '../ChatroomForm';
import AdminInviter from '../AdminInviter/AdminInviter';
import MemberInviter from '../MemberInviter/MemberInviter';
import ChatroomManager from '../ChatroomManager';

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
    userRelation: PropTypes.string.isRequired,
    lastMessageReceived:PropTypes.number,
    lastRead: PropTypes.number,
  }

  state = {
    timer : null,
    newTimeStamp : null,
    lastMsgRecived :null,
    error: null
  }

  componentDidMount() {
    this.state.timer = setInterval(()=> this.updateChat(), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.setState({timer:null});
  }
  
  /* THere is a small problem we cant make actions for these compoments since
     if we would they would all overwrite the store and all components would badicly
     have what ever was stored last, and in the process they will be rewriting the shit
     out of each other */
  async updateChat() {
    /*
    const {chatroomName} = this.props;
    const res = await noDataRequest(`auth/chatroom/${chatroomName}/membership`,"GET");
    if(!res) {
      this.setState({error : "something went very wrong server side"});
      return;
    }
    // if error we update the state
    if(res.result.hasOwnProperty("error")) {
      this.setState({error : res.result.error});
      return;
    }
    this.setState({newTimeStamp : res.result.lastMessageReceived,
      lastMsgRecived: res.result.lastRead, error:null});
      */
  }

  /* This is a example of when we want them to overwrite the store state since only 
     one chat window can be opened at a time, the component that overwrited the store last
     will display its chat */
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
    const {displayName,lastRead,lastMessageReceived,userRelation,chatroomName } = this.props;
    const {newTimeStamp,lastMsgRecived,error} = this.state;
    // if the user has read the las,t msg we display the offline logo
    // else we show that he is oline
    let chatNewMsg;
    /* There are 3 possible erros for this class
       1: 500 error -> log out user just to go to a safe state
       2: JTW token invalid -> have to logout the user since his token is invalid
       3: chat dosent exist ? but it existed on the initial load ? (spooky error)
          so to be safe we just log out the user to be in a safe state */
    if(error) { console.log(error); this.callLogout(); }
    if(newTimeStamp) {
      chatNewMsg = lastMsgRecived < newTimeStamp ? "online" : "offline";
    } else {
      chatNewMsg = lastRead < lastMessageReceived ? "online" : "offline";
    }


    return (
      <div>
        <div className="wrap"  onClick={this.openNewChat.bind(this)}>
          <span className={chatNewMsg}></span>
          <img src="/img/wow.png" alt="the very wow logo" />
          <div className="meta">
            <p className="name">{displayName} ({chatroomName})</p>
          </div>
        </div>
        <div>
          <div>
            <a onClick={() => {this.setState({chatroomManagerOpen: true})}} >Manage Chat</a>
            <Modal
              show={this.state.chatroomManagerOpen}
              onHide={ () => this.setState({ chatroomManagerOpen: false }) }
              container={this}
              aria-labelledby="contained-modal-title"
            >
              < Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title" className="blacktext">
                    Manage Chatroom
                  </Modal.Title>
                </Modal.Header>
              <Modal.Body className="blacktext">
                <ChatroomManager 
                  chatroomName = {chatroomName} 
                  userRelation = {userRelation}>
                </ChatroomManager>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

/* The chat bouble atm dosent need anything from store but maybe it will need later
   at this moment we need to connect the chatboubles to store so they can tell
   which chat should be open. */
const mapStateToProps = (state) => {
  return {
  }
}
export default connect(mapStateToProps)(ChatBouble);
  