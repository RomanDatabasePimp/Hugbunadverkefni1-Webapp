import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserData, addOrAccepReset} from '../../actions/addAcceptAction';

class Friendrequests extends Component {

  static propTypes = {
    friendRequestors: PropTypes.array,
  }



  render() {
    /* array of user:{ user : {username:,displayName: }} */
    const {friendRequestors} = this.props;
    //{username: "dah38", displayName: "Davíð"}
    const friendrequests = friendRequestors.length > 0 ? 
    friendRequestors.map((item,key) => {
     return(<li key={key}>
              <p>{item.displayName}</p>
            </li>)
    }) : <li>Looks like you have no friend requests</li>;

    

    return (
      <div className="border">
        <h3>Friend Requests</h3>
        <ul className="horizontal_list">
          {friendrequests}
          <div>
  <input type="checkbox" id="horns" name="horns" />
  <label for="horns">Accept</label>
</div>
<div>
  <input type="checkbox" id="horns" name="horns" />
  <label for="horns">Reject</label>
</div>
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
  
  }
}

/* make this component aware of the aplication store 
   þetta er ekki lengur component heldur Container */
 export default connect(mapStateToProps)(Friendrequests);