import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrAcceptUser, addOrAccepReset,rejectFriend} from '../../actions/addAcceptAction';

class Friendrequests extends Component {

  static propTypes = {
    friendRequestors: PropTypes.array,
  }

  state = {
    friends : []
  }
  
  componentDidMount() {
    const { dispatch,friendRequestors } = this.props;
    this.setState({friends:friendRequestors});
    dispatch(addOrAccepReset());
  }

  /* Usage : removeFromRequests(val)
      For  : val is the username 
     After : removes val from requests */
  removeFromRequests(val) {
    const  temp = this.state.friends;
    temp.map((i,key) => {
      if(i.username === val) {
        temp.splice(key,1);
      }
    });
   this.setState({ friends : temp});
  }

  /* Usage : acceptFriend(e)
       FOr : e is a button with value
     After : calls an acction that accepts friend  */
  acceptFriend(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(addOrAcceptUser(value,"POST"));
    this.removeFromRequests(value);
  }

  /* Usage : acceptFriend(e)
       FOr : e is a button with value
     After : calls an acction that accepts friend  */
  rejectFriend(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(rejectFriend(value));
    this.removeFromRequests(value);
  }

  render() {
    /* array of user:{ user : {username:,displayName: }} */
    const { friends } = this.state;
    const {  error, addAccepted } = this.props;

    const errs = error ? <p className="error"> {error} </p> : <span></span>;
    const succ = addAccepted ? <p>Success !</p> : <span></span>;

    //{username: "dah38", displayName: "Davíð"}
    const friendrequests = friends.length > 0 ? 
    friends.map((item,key) => {
     return(<li key={key} className="request_border">
              <p>{item.displayName}</p>
              <button className="button acc" value={item.username} onClick={this.acceptFriend.bind(this)}>Accept</button>
              <button className="button rej" value={item.username} onClick={this.rejectFriend.bind(this)}>Reject</button>
            </li>)
    }) : <p>Looks like you have no friend requests</p>;

    return (
      <div className="border">
        <h3>Friend Requests</h3>
        {errs}
        {succ}
        <ul className="horizontal_list">
          {friendrequests}
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
 export default connect(mapStateToProps)(Friendrequests);