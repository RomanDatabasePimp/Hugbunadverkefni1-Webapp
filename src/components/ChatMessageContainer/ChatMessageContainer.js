import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { number } from 'prop-types';
import { logoutUser  } from '../../actions/userActions';
import { datarequest,noDataRequest } from '../../api';

class ChatMessageContainer extends Component {
  
  state = {
    /* this stores all our messages each message has a form of
     {"senderUsername": "dah38",
       "senderDisplayName": "Davíð",
       "message": "Message 34",
       "timestamp": 1542540162938 } */
    messages : [],
    currentMsg : "", /* the current message beeing written */
    userId:"",       // id the the username
    userName:"",     // users display name
    timer: null,     // we need to pull the chat logs
    myOffestBACK:null,// used to traverse the chat logs backwards
    myOffestFRONT:null,//used to traverse the chat logs forward
    bottomEl:null, // used keep track of the bottom element so we can scrll down to it
    mouseMoving:false 
  }  

  static propTypes = {
    chatid :  PropTypes.string.isRequired, // we must get chat id
    chatname : PropTypes.string.isRequired // we must get chat name
  }

  /*  When the component is mounted we need to fetch the user deatails from the local storange
      and initialize the pulling of the chat messages */
  componentDidMount() {
    // enable the inverval
    this.state.timer = setInterval(()=>  this.getChatLogs(), 2000);
    // fetch the user info from the session storage
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.setState({userId: user.username, userName: user.displayname});
  }
  
  /* react dosent re-render the whole component for effiancy sake so we clear the messages
     when someone changes chats  */
  componentWillReceiveProps(nextProps) {
    if(nextProps.chatid !== this.props.chatid){
      // since a new chat is open we need to make sure
      // that a new pulling starts correcly
      this.setState({messages:[],currentMsg:"",myOffestBACK:null,myOffestFRONT:null});
    }
  } 

  /* to be save we also handle some things when the user switches a chat log f.x
     like removing the intervals so they dont continue running in the background */
  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.setState({timer:null});
  }

  /* Usage : markChatRead()
      For  : nothing
     After : calls the api to make a async HTTP POST REQUEST on /auth/chatroom/{chatid}/markread */
  /* Something are good to keep as actions and some are not so good
     f.x marking chats as read is just a one way Request to the server
     we rly dont care what it returns we just want to notify the server 
     that we read it  */
  markChatRead() {
   const {chatid} = this.props;
   /* we let it be async since we dont care what it returns we just want
      the request to be recived by the server */
   datarequest(`auth/chatroom/${chatid}/markread`,{},"POST");
  }

  /* Usage : getChatLogs()
      For  : nothing
     After : sends GET request on the Server for chat logs of {chatid}'S chat */
  async getChatLogs() {
    const { chatname, chatid,dispatch} = this.props;
    const { myOffestFRONT } = this.state;
    // if time stamp is not null then there is a timestamp we can fetch from
    if(myOffestFRONT ||typeof(myOffestFRONT) === 'number' ) {
      
      // here we need to fetch all the new messages from a offest
      const chats = await noDataRequest(`auth/chatroom/${chatid}/messages/${myOffestFRONT}`,"GET");
      if(chats.status >= 400 || chats.status >= 500) {
        console.log("something went wrong")
        dispatch(logoutUser());
        return;
      }
      
     chats.result.map((item) => {
       this.state.messages.push({
        message:item.message,
        timestamp:item.timestamp,
        senderUsernameId:item.senderUsername,
        senderUsername:item.senderDisplayName,
       });
     });
     const newOffSet = myOffestFRONT + chats.result.length;
     this.setState({myOffestFRONT:newOffSet});
     return;
    }
    // if we make it here this means this is the first time we pull a from a server
    // we need to pull the count of the chats from the server
    const chatCount = await noDataRequest(`auth/chatroom/${chatid}/messages/count`,"GET");
    if(chatCount.status >= 400 || chatCount.status >= 500) {
      console.log("something went wrong")
      dispatch(logoutUser());
      return;
    }

    // will always want about 20 last chat logs for the user to fap over
    const chatoffset = chatCount.result - 20 < 0 ? 0 : chatCount.result -20;
    const chats = await noDataRequest(`auth/chatroom/${chatid}/messages/${chatoffset}/20`,"GET");
    if(chats.status >= 400 || chats.status >= 500) {
      console.log("something went wrong")
      dispatch(logoutUser());
      return;
    }
    
   chats.result.map((item) => {
     this.state.messages.push({
      message:item.message,
      timestamp:item.timestamp,
      senderUsernameId:item.senderUsername,
      senderUsername:item.senderDisplayName,
     });
   });
   this.setState({myOffestFRONT:chatoffset+chats.result.length , myOffestBACK:chatoffset});
  }

  /* Usage : sendMsgToChat()
      For  : nothing 
     After : sends a HTTP POST REQUEST to /auth/chatroom/{chatname}/message
             with a json body of  { "message": currentMsg } */
  /* again here we rly dont want allot of state changes happening in our app
     since msg sending is happens so ofter, we want to try to reduce the re-rendering
     as much as possible */
  sendMsgToChat() {
    const { currentMsg,userId,userName } = this.state;
    const { chatid,dispatch } = this.props;
    /* check if the string is empty or is just a whitespace
       since we dont want to flood the server with nonsense ... */
    if(/\S/.test(currentMsg)) {
      // send the msg to the clinet we want to have this functionnality
      datarequest(`auth/chatroom/${chatid}/message`,{ message: currentMsg },"POST");
      // reset the currentMsg so the user can send a new msg
      this.setState({currentMsg : ""});
    }
    return;
  }


  /* Usage: pollMessages()
      For : nothing */

  /* Usage : handleTypedMsg(E)
      For  : e is an input element with the name of sendChatBTN
     After : saves the users current msg in a state */
  handleTypedMsg = (e) => {
    const { name,value } = e.target;
    if(name) { this.setState({ currentMsg : value }); }
  }
    
  /* Usage : handleKeyInput(e)
      For  : e is an input element
      After: checks if the enter key has been enabled
             if so we call sendMsgToChat */
  handleKeyInput = (e) => {
    if(e.keyCode === 13) {
      this.sendMsgToChat();
    }
  }

  render() {
    // fetch our stuff
    const { chatname, chatid} = this.props;
    const { messages,currentMsg,userId } = this.state;

    let theMsgs;
    // if msgs exist we want to display them
    if(messages.length > 0) {
      theMsgs = messages.map((item,key) => {
      //{message: "helo", timestamp: 1542545877442, senderUsernameId: "Roman", senderUsername: "ror9"}
      // figure out what icon to use
      const myImg = item.senderUsernameId.substr(0,1).toLowerCase().match("^[a-z]+$")? item.senderUsernameId.substr(0,1).toLowerCase() :'wow';
      // if this client sent the msg then we make it on the left side
      if(item.senderUsernameId === userId){
        return (<li className="replies" key={key}>
                  <img src={`/img/${myImg}.png`}  alt="" />
        	        <p> {item.message} </p>
                </li>)
      }
      return (<li className="sent" key={key}>
                <img src={`/img/${myImg}.png`}  alt="" />
                <p> {item.message} </p>
              </li>)
      });
    } 
    // if they dont then we just show nothing 
    else {
      // display a happy message
     theMsgs = <p>Hey it's lonely in here maybe you want to actually talk on a chat app?</p>;
    }

    return (
      <div className="content">
        {/* Upper part of the chat where you  maybe add more
            if we want or have time to do it */}
        <div className="contact-profile">
			    <img  src={`/img/wow.png`} alt="" />
			    <p>{chatname}</p>
		    </div>
        {/* where all the messages are displayed */}
		    <div className="messages">
			    <ul>
             {theMsgs}
			    </ul>
		    </div>
		    <div className="message-input" onClick={this.markChatRead.bind(this)} >
		      <div className="wrap">
            <input type="text" name="sendchatbutton" placeholder="Write your message..." 
              onKeyDown={this.handleKeyInput} value={currentMsg} onChange={this.handleTypedMsg} />  
			      <button className="button" onClick={this.sendMsgToChat.bind(this)}>Send</button>
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