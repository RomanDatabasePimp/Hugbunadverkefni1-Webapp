import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {Modal} from 'react-bootstrap';
import { logoutUser  } from '../../actions/userActions';
import { getUserData } from '../../actions/initialloadofapp';
import Friendrequests from '../Friendrequests';

class Sidepanel extends Component {

  state = {
    username: '',    // i dont know if i need this just good to have it for later
    displayname: '', // need to show the display name
    isSearching:false, // if the user is using the searcg filter option
    showUserPop:false,// indicates if we should show popup for the user info
    filteredChat:[], // the filtered chat
  }

  async componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const { dispatch } = this.props;
    this.setState({displayname: user.displayname, username: user.username });
    /* Since all componets are initiated from here we just make 1 call and fetch
       all the data and pass it down to the components that will be initialized here */  
    dispatch(getUserData());
  }
  
  /* Usage : searchMyChats(e)
      For  : e is a input element that has name searchchat
     After : filters the chat array from props to the requested input */
  searchMyChats = (e) => {
    const { chatrooms } = this.props;
    const { searchchat } = e.target;
    // if the input is empty then we return 
    if(searchchat) { this.setState({ isSearching:false }); return;  }
      const filteredchat = [];
      for(let chatroom in chatrooms ) {
        if(chatrooms[chatroom].displayName.toLowerCase().match(searchchat.toLowerCase())){
          filteredchat.push(chatrooms[chatroom]);
        }
      }
    this.setState({ isSearching:true,filteredChat:filteredchat });
  }

  /* Usage : logout()
       For : nothing 
     After : dispaches the logout */
  logout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    // get the state
    const { username,displayname,isSearching,filteredChat,showUserPop} = this.state;
    // get all the props we can also use this = friendRequestees,chatroomRequests,chatroomAdminInvites
    const {dispatch,isFetching,errorMsg,
           chatroomInvites,chatrooms,friends,friendRequestors } = this.props;
    
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
              <img id="profile-img" src={`/img/${myImg}.png`} alt="" className="online" />
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
            <Modal.Header closeButton>
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
          <input name="searchchat" type="text" placeholder="Search Chats..." onChange={this.searchMyChats}/>
        </div>

        {/* All the chat rooms the user belongs to */}
        <div  iv id="contacts">
          <ul>
      
          </ul>
        </div>
        
        
        {/* bottom bar  */}
          <div id="bottom-bar">
            <button ><span>Add Friends</span></button>
            <button ><span>Create Chat</span></button>
          </div>
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
    friends:state.initialloadofapp.friends,
    friendRequestors:state.initialloadofapp.friendRequestors
  }
}

/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(Sidepanel);