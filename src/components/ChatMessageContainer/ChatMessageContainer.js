import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ChatMessageContainer extends Component {
  
  state = {
    /* Store the msg while the user continues to talk maybe also get the last 10 msg
       for the chat to make it look better ??? */
    messages : []
  }  

  static propTypes = {
    chatid :  PropTypes.string.isRequired, // we must get chat id
    chatname : PropTypes.string.isRequired // we must get chat name
  }

  /*
  <li class="sent">
	<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
	<p> i love big dicks what about you </p>
  </li>
  <li class="replies">
	<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
	<p> Omg ! they are the best !!!</p>
  </li>
  */
  render() {
    const {chatname} = this.props;

    return (
      <div className="content">
		<div className="contact-profile">
			<img  src={`/img/wow.png`} alt="" />
			<p>{chatname}</p>
		</div>

		<div className="messages">
			<ul>
            <li className="sent">
	<p> i love big dicks what about you </p>
  </li>
  <li className="replies">
	<p> Omg ! they are the best !!!</p>
  </li>
			</ul>
		</div>

		<div className="message-input">
		  <div className="wrap">
			<input type="text" placeholder="Write your message..." />  
			<button className="button">Send</button>
		  </div>
		</div>
	  </div>
    );
  }

}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
  }
}
    
/* make this component aware of the aplication store 
   þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(ChatMessageContainer);