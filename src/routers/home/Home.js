import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openNewChat } from '../../actions/opennewchat';
import { logoutUser  } from '../../actions/userActions';
import { userInfoStateReset,getUserData } from '../../actions/initialloadofapp';
import {Modal,Button} from 'react-bootstrap';
import ChatBouble from '../../components/ChatBouble';
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
    filteredChat:[], // the filtered chat
    showUserPop:false,// indicates if we should show popup for the user info
  }
  
  async componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const { dispatch } = this.props;
    this.setState({ username: user.username, displayname: user.displayname });
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
      if(chatrooms[chatroom].displayName.toLowerCase().match(searchchat)){
        filteredchat.push(chatrooms[chatroom]);
      }
    }
    this.setState({ isSearching:true,filteredChat:filteredchat });
  }

  render() {
    const {isSearching, displayname,filteredChat} = this.state;
    const {dispatch,isFetching,errorMsg,chatroomAdminInvites,friendRequestees,
           chatroomInvites,chatroomRequests,chatrooms,friends,friendRequestors } = this.props;

    // since we are potentionally fetching allot of stuff for the user we show him a loading bar
    if(isFetching) {
      return (<section className="vertical-center">
                <Helmet title='Processing'></Helmet>
                <div className="loader"></div>
              </section>);
    }
    // Since errors should NEVER happen on this route we clear the session storage and redirect the user to loning 
    if(errorMsg) {
      console.log(errorMsg," Beeing redirected to /login");// print error for debug popuses
      dispatch(logoutUser());
    }

    //if the user decided to filter his chats then we use those insted
    const myChats = isSearching? filteredChat : chatrooms;
    // if u try having letters other than a-z then you get dodge
    const myImg = displayname.substr(0,1).toLowerCase().match("^[a-z]+$")? displayname.substr(0,1).toLowerCase() :'wow';

    /* create our chat boubles */
    const chatboubles = [];
    if(myChats){
      for(let i =0; i < myChats.length ; i++){
        chatboubles.pop(<ChatBouble chatroom={myChats[i]}></ChatBouble>);
      }
    }

    // maybe the biggest route of them all
    return (
      <main id="frame">
      <Helmet title={`Welcome ${displayname}`} ></Helmet>

      {/* --------------------Side panel starts------------------------------ */}
        <section id="sidepanel">
          {/* THe logged in user */}
          <div id="profile">
            <div className="wrap" onClick={() => this.setState({ showUserPop: true })}>
               {/* get the image with the first name  */}
              <img id="profile-img" src={`/img/${myImg}.png`} alt="" className="online" />
              <p>{displayname}</p>
            </div>
          </div>
          {/* Users popup profile */}
          <Modal
            show={this.state.showUserPop}
            onHide={ () => this.setState({ showUserPop: false }) }
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                {displayname}'s profile
              </Modal.Title>
            </Modal.Header>
          <Modal.Body>
            to do
          {/* TO DO make  */}
          </Modal.Body>
        </Modal>

        {/* --------------------Side panel ENDS------------------------------ */}


          {/* THe search bar  */}
          <div id="search">
            <input name="searchchat" type="text" placeholder="Search Chats..." onChange={this.searchMyChats}/>
          </div>

          {/* All the chat rooms the user belongs to */}
          <div  iv id="contacts">
            <ul>
                {chatboubles}
            </ul>
          </div>
        
          {/* bottom bar  */}
          <div id="bottom-bar">
            <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add Friends</span></button>
            <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Create Chat</span></button>
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
