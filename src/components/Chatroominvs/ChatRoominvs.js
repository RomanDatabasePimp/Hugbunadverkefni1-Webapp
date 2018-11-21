import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  addOrAccepReset, acceptChatInv} from '../../actions/addAcceptAction';

class ChatRoominvs extends Component {

  static propTypes = {
    chatroomInv : PropTypes.array,
  }

  state = {
    Chatrooms : []
  }
  
  componentDidMount() {
    const { dispatch,chatroomInv } = this.props;
    this.setState({Chatrooms:chatroomInv});
    dispatch(addOrAccepReset());
  }

  /* Usage : removeFromRequests(val)
      For  : val is the username 
     After : removes val from requests */
  removeFromRequests(val) {
    const  temp = this.state.Chatrooms;
    temp.map((i,key) => {
      if(i.chatroomName === val) {
        temp.splice(key,1);
      }
    });
    this.setState({ Chatrooms : temp});
  }

  acceptChat(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(acceptChatInv(value,"POST"));
    this.removeFromRequests(value);
  }
    
  rejectchat(e) {
    console.log("NOT IMPLEMENTED ");
  }
    
  render() {
    const { Chatrooms } = this.state;
    const { error, addAccepted } = this.props;

    const errs = error ? <p className="error"> {error} </p> : <span></span>;
    const succ = addAccepted ? <p>Success !</p> : <span></span>;
    
    // {chatroomName: "c6", displayName: "disp6", description: "desc6", listed: true, invited_only: true, …}
    const chatrequests = Chatrooms.length > 0 ? 
    Chatrooms.map((item,key) => {
     return(<li key={key} className="request_border">
              <p>Name :{item.displayName}</p>
              <button className="button acc" value={item.chatroomName} onClick={this.acceptChat.bind(this)}>Accept</button>
              <button className="button rej" value={item.chatroomName} onClick={this.rejectchat.bind(this)}>Reject</button>
            </li>)
    }) : <p>Looks like you have no friend requests</p>;
    
    return (
      <div className="border">
        <h3>Member Chatroom Invites</h3>
        {errs}
        {succ}
        <ul className="horizontal_list">
          {chatrequests}
        </ul>
      </div>
    );
  }
}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
    error: state.addAcceptAction.error,
    addAccepted: state.addAcceptAction.addAccepted
  }
}

/* make this component aware of the aplication store 
   þetta er ekki lengur component heldur Container */
 export default connect(mapStateToProps)(ChatRoominvs);