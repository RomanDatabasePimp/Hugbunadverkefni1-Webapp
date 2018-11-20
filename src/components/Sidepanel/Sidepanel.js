import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {Modal} from 'react-bootstrap';
import { logoutUser  } from '../../actions/userActions';
import { getUserData } from '../../actions/initialloadofapp';
import Friendrequests from '../Friendrequests';
import ChatBouble from '../ChatBouble';
import ChatroomForm from '../ChatroomForm';
import AddFriendsFrom from '../addFriendsForm';

class Sidepanel extends Component {

  state = {
    username: '',    // i dont know if i need this just good to have it for later
    displayname: '', // need to show the display name
    isSearching:false, // if the user is using the searcg filter option
    showUserPop:false,// indicates if we should show popup for the user info
    filteredChat:[], // the filtered chat
    chatroomManagerOpen:false, // if the chatroomManager is open
    friendsButtonOpen:false,
    searchchats:""
  }

  async componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const { dispatch } = this.props;
    this.setState({displayname: user.displayname, username: user.username });
    /* Since all componets are initiated from here we just make 1 call and fetch
       all the data and pass it down to the components that will be initialized here */  
    dispatch(getUserData());
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.actionSuccess !== this.props.actionSuccess){
      // since a new chat is open we need to make sure
      // that a new pulling starts correcly
      const { dispatch } = this.props;
      dispatch(getUserData());
    }
  } 
  /* Usage : searchMyChats(e)
      For  : e is a input element that has name searchchat
     After : filters the chat array from props to the requested input */
  searchMyChats = (e) => {
    const { name,value } = e.target;
    const { chatrooms } = this.props;
    /* since need to update the chat here elese we can never enter */
    this.setState({ searchchats:value });

    /* the string contains spaces or smth we dont want to update the chat */
    if(!/\S/.test(value)) { this.setState({ isSearching:false }); return;  }
    const filteredchat = [];
   
    for(let chatroom in chatrooms ) {
      let chatname = chatrooms[chatroom].displayName.toLowerCase();
      // we always check if the name matches our request if not then serach it by tags
      if(chatname.match(value.toLowerCase())){
        filteredchat.push(chatrooms[chatroom]);
      }
    }
    // if we made it here we return the filtered chats that were resulted
    this.setState({ isSearching:true,filteredChat:filteredchat});
  }

  /* Usage : logout()
       For : nothing 
     After : dispaches the logout */
  logout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  /* Usage : checkIfChatReoomCreated()
      For  : nothing
     After : checks if a new chatroom has been created
             if it has then its added to the chatrooms so the user can see them */
  checkIfChatReoomCreated(){
    const { chatroom,dispatch } = this.props;
    if(chatroom){
      dispatch(getUserData());
    }
  }

  render() {
    // get the state
    const { username,displayname,isSearching,filteredChat,showUserPop,searchchats} = this.state;
    // get all the props we can also use this = friendRequestees,chatroomRequests,chatroomAdminInvites
    const {dispatch,isFetching,errorMsg,
           chatroomInvites,chatrooms,friends,friendRequestors} = this.props;
    
    if(isFetching) {
        return (<Helmet title={`Loading`} ></Helmet>);
    } 
     /* Since errors should NEVER happen on this route we clear the session storage 
         and riderect the user to login wich is a safe state */ 
    if(errorMsg) {
      console.log(errorMsg," Beeing redirected to /login");// print error for debug popuses
      dispatch(logoutUser()); // call the logout
    }
  
    //if the user decided to filter his chats then we use those insted
    const myChats = isSearching? filteredChat : chatrooms;

    // we create the chat boubles now if the chats exist
    const chatboubles = myChats ?  Object.keys(myChats).map(function (key) {
      return(
        <li className="contact" key={key}>
          <ChatBouble chatroomName={myChats[key].chatroomName}
            displayName={myChats[key].displayName}
            lastMessageReceived={myChats[key].lastMessageReceived}
            lastRead={myChats[key].lastRead}
            userRelation={myChats[key].userRelation}></ChatBouble>
        </li>
      )}): <p></p>;

    // if u try having letters other than a-z then you get dodge
    const myImg = displayname.substr(0,1).toLowerCase().match("^[a-z]+$")? displayname.substr(0,1).toLowerCase() :'wow';
    
    return (
      <section id="sidepanel">
        {/* style points for making the titles O SO SEXY */}
        <Helmet title={`Welcome ${displayname}`} ></Helmet>
        <p className="logOutButton" onClick={this.logout}>X</p>

        {/* -------------------TOP SIDE OF PANEL START--------------------------------------- */}
          {/* Shows the displayname of the user logged in and allows you to click on it
              to get your user things */}
          <div id="profile">
            <div className="wrap" onClick={() => this.setState({ showUserPop: true })}>
              {/* get the image with the first name  */}
              <img id="profile-img" src={`/img/${myImg}.png`} alt="very wow logo" className="online" />
              <p>{displayname}</p>
            </div>
          </div>

          {/* If the user clicks on his icon then a window will pop upp
              with all his stuff */}
          <Modal
            show={this.state.showUserPop}
            onHide={ () => this.setState({ showUserPop: false }) }
            container={this}
            aria-labelledby="contained-modal-title"
          >
            < Modal.Header closeButton>
                <Modal.Title id="contained-modal-title" className="blacktext">
                  {displayname}'s profile
                </Modal.Title>
              </Modal.Header>
            <Modal.Body className="blacktext">
              <Friendrequests friendRequestors={friendRequestors}></Friendrequests>
            </Modal.Body>
          </Modal>

        {/* -------------------TOP SIDE OF PANEL START--------------------------------------- */}

        {/* The search bar for sorting chats  */}
        <div id="search">
          <input type="text" value={searchchats} name="searchAllChats" placeholder="Search chats.." onChange={this.searchMyChats}/>
        </div>

        {/* All the chat rooms the user belongs to */}
        <div  iv id="contacts">
          <ul>
            {chatboubles}
          </ul>
        </div>
        
        
        {/* bottom bar  */}
          <div id="bottom-bar">
            <button onClick={() => {this.setState({friendsButtonOpen: true})}} ><span>Add Friends</span></button>
            <button onClick={() => {this.setState({chatroomManagerOpen: true})}}><span>Create Chat</span></button>
          </div>
          <Modal
            show={this.state.friendsButtonOpen}
            onHide={ () => this.setState({ friendsButtonOpen: false }) }
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title" className="blacktext">
                  Ugh you lonely soul, go ahead add some friends
                </Modal.Title>
              </Modal.Header>
            <Modal.Body className="blacktext">
               <AddFriendsFrom></AddFriendsFrom>
            </Modal.Body>
          </Modal>

          <Modal
            show={this.state.chatroomManagerOpen}
            onHide={ () => {this.checkIfChatReoomCreated();this.setState({ chatroomManagerOpen: false }); } }
            container={this}
            aria-labelledby="contained-modal-title"
          >
            < Modal.Header closeButton>
                <Modal.Title id="contained-modal-title" className="blacktext">
                  Create a new chatroom
                </Modal.Title>
              </Modal.Header>
            <Modal.Body className="blacktext">
              <ChatroomForm edit={false} chatroomName={""} ></ChatroomForm>
            </Modal.Body>
          </Modal>
        </section>
    );
  }



}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
    isFetching: state.initialloadofapp.isFetching,
    errorMsg: state.initialloadofapp.errorMsg,
    //chatroomAdminInvites:state.initialloadofapp.chatroomAdminInvites,
    //friendRequestees:state.initialloadofapp.friendRequestees,
    chatroomInvites:state.initialloadofapp.chatroomInvites,
    //chatroomRequests:state.initialloadofapp.chatroomRequests,
    chatrooms:state.initialloadofapp.chatrooms,
    chatroom: state.chatroom.chatroom,
    friends:state.initialloadofapp.friends,
    friendRequestors:state.initialloadofapp.friendRequestors
  }
}

/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(Sidepanel);