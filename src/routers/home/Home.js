import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sidepanel from '../../components/Sidepanel';
import ChatMessageContainer from '../../components/ChatMessageContainer';
import './home.css';

/* This is where the beef happens when the user is logged in he will be greeted
   with this route and this route will initialize all the components and  those 
   component will initialize their own stuff to make this bueaty work  */
class Home extends Component {

  render() {
    const { chatid, chatname } = this.props;
    
    const chatopen = !chatid ? <ChatMessageContainer chatid={chatid} chatname={chatname}></ChatMessageContainer> : <span></span>;
    // Here comes the component initiation hell !!!
    return (
      <main id="frame">
        {/* create the left sidepanel */}
        <Sidepanel></Sidepanel>

        {chatopen}
        
      </main>
    );
  }
}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
    chatid:state.opennewchat.chatid,
    chatname:state.opennewchat.chatname
  }
}
/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(Home);
