import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openNewChat } from '../../actions/opennewchat';
import { userInfoStateReset,getUserData } from '../../actions/initialloadofapp';
import { Redirect, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import './home.css';

/* This is where the beef happens when the user is logged in he will be greeted
   with this route and this route will fetch all the nessesary stuff needed to make the 
   accual chat services work  */
class Home extends Component {

  state = {
    username: '',    // i dont know if i need this just good to have it for later
    displayname: '', // need to show the display name
    isSearching:false, // if the user is using the searcg filter option
    filteredChat:null,
  }
  
  async componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.setState({ username: user.username, displayname: user.displayname });
  }

  render() {
    const {isSearching, displayname} = this.state;
  
  return (
    <main id="frame">
    <Helmet title={`Welcome ${displayname}`} ></Helmet>
    {/* --------------------Side panel starts------------------------------ */}
      <section id="sidepanel">
        {/* THe logged in user */}
        <div id="profile">
          <div class="wrap">
            <img id="profile-img" src={`/img/${displayname.substr(0,1).toLowerCase()}.png`} alt="" class="online" />
            <p>{displayname}</p>
          </div>
        </div>
        
        {/* THe search bar  */}
        <div id="search">
          <input type="text" placeholder="Search Chats..." />
        </div>

        {/* THe search bar content container */}
        <div id="contacts">
          <ul>
              
          </ul>
        </div>
        
        {/* bottom bar  */}
        <div id="bottom-bar">
          <button id="addcontact"><i class="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add Friends</span></button>
          <button id="settings"><i class="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Create Chat</span></button>
        </div>
      </section>
    {/* --------------------Side panel ends------------------------------------ */}
    </main>);
  }
}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
  const mapStateToProps = (state) => {
    return {
      //chatid:state.opennewchat.chatid,
      //chatname:state.opennewchat.chatname
      isFetching: state.initialloadofapp.isFetching,
      errorMsg: state.initialloadofapp.errorMsg,
      chatroomAdminInvites:state.initialloadofapp.chatroomAdminInvites,
      friendRequestees:state.initialloadofapp.friendRequestees,
      chatroomInvites:state.initialloadofapp.chatroomInvites,
      chatroomRequests:state.initialloadofapp.chatroomRequests,
      chatrooms:state.initialloadofapp.chatrooms,
      friends:state.initialloadofapp.friends,
      friendRequestors:state.initialloadofapp.friendRequestors
    }
  }
/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
  export default connect(mapStateToProps)(Home);
