import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrAcceptUser, addOrAccepReset, clientSideError} from '../../actions/addAcceptAction';

class AddFriendsFrom extends Component {

  state = {
    newUser : "" /* hold the user name that the client wants to add */
  }

  /* Since we use Store we need to make sure that the sore is always
     whiped before we use it to ensure the intended functuonallity */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addOrAccepReset);
  }

  /* Usage  : handleInputChange(e)
       For  : e is an input html element
              that has the name field of newUser
     Efitr  : updates our state based of on inputs */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) { this.setState({ [name]: value }); }
  }

  /* Usage : handleSubmit(e)
      For  : e is a form element
     After : prevents the default behaviour of the form and calls the
             Action to try to add friends */
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { newUser } = this.state;
    if(/^[A-Za-z0-9ÁáÉéðÐþÞæÆóÓöÖ]+$/.test(newUser)){
      dispatch(addOrAcceptUser(newUser,"POST"));
      return;
    }
    dispatch(clientSideError("Username must be valid"));
  }

  render() {
    const { newUser } = this.state;
    const { isFetching, error, addAccepted } = this.props;

    const err = error ? <div className="form-group" ><p className="error">{error}</p></div> : <span></span>;
    const succ = addAccepted ? <div className="form-group" ><p>{`A friend request has been sent to ${newUser}`}</p></div> : <span></span>
    if(isFetching) {
      return (<div className="loader"></div>)
    }

    return (
      <form className="modal_form" onSubmit={this.handleSubmit}>
          {succ}
          {err}
          <div className="form-group" >
            <label >New friends username 
              <input className="form-control" type="text" value={newUser} name="newUser" required placeholder="Friends username" onChange={this.handleInputChange} autoFocus/>
            </label>
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
    isFetching: state.addAcceptAction.isFetching,
    error: state.addAcceptAction.error,
    addAccepted: state.addAcceptAction.addAccepted
  }
}

/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(AddFriendsFrom);