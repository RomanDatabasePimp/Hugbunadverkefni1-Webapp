import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Modal} from 'react-bootstrap';
import { logoutUser  } from '../../actions/userActions';
import { getUserData } from '../../actions/initialloadofapp';

class AddFriendsFrom extends Component {

  state = {
    newUser : "" /* hold the user name that the client wants to add */
  }

  render() {
    return (
 
        <form onSubmit={this.handleSubmit}>
       <h1 className="form_headder">Login</h1>
          {/* Username input */}
          <div className="form-group">
            <label htmlFor="userName">Username </label>
            <input className="form-control" type="text" name="userName" required  />
          </div>


        </form>
    )
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
export default connect(mapStateToProps)(AddFriendsFrom);