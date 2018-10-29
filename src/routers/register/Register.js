import React, { Component } from 'react';
import { registerUser, registerStateReset } from '../../actions/reg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../components/button';
import Helmet from 'react-helmet';

class Register extends Component {

  /* Define our starting state for the Register */
  state = {
    userName: '',
    displayName:'',
    password: '',
    passwordReap: '',
    email: '',
  }

  /* This is used to reset all our states, orlse if the user f.x registers goes to some other url f.x /login
     and comes back here the errors will still be present thats just ugly so we always make use to reset states */
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(registerStateReset());
  }

  /* Usage : this.handleInputChange
      For  : e is a input html element that has 'name' attribute as 
             username,displayname,passowrd,passwordReap or email
    After  : Updates the state based of in which input was typed */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      this.setState({ [name]: value });
    }
  }

  /* Usage : this.handleSubmit
     For   : ekkert
    After  : call the action registerUser and pass it the data */
  handleSubmit = async (e) => {
    e.preventDefault(); // slökkva á default hegðun á formi
    const { dispatch } = this.props;
    const { userName, displayName, password,passwordReap,email } = this.state;
    const data = {userName,displayName,password,passwordReap,email};
    dispatch(registerUser(data));
  }


  render() {
    const { userName, displayName, password,passwordReap,email } = this.state; // we can work with the states
    const { isFetching, isRegistrated, message } = this.props; // get our props
    // if errors exist then we create a ErrorList out of them
    console.log(message);
    const errorsExist = message ?<p> {message.errors[0].errors}</p> : <p></p>;
    // if the data is beeing fetched we notify the client that registration is beeing worked on
    if (isFetching) {
      return (<div className=''><span>Registrating</span><Helmet title='...'></Helmet></div>);
    }
    if (isRegistrated) {
        return (<div className=''>
                  <Helmet title='Registrated '></Helmet>
                  <h1> User created ! </h1>
                  <p>Before you can login, you need to go to your email and open the validation link</p>
                </div>);
    }
   
    // and now comes the real pain in the ass
    return (
        <div className=''>
        <Helmet title='Registration'></Helmet>
        <div className=''>
          <h1> Registration </h1>
          {errorsExist}
         
          <form onSubmit={this.handleSubmit}>

            <div className=''>
              <label htmlFor="userName">Username:</label>
              <input className='' type="text" name="userName" required value={userName} onChange={this.handleInputChange} />
            </div>

             <div className=''>
              <label htmlFor="displayName">Display Name:</label>
              <input className='' type="text" name="displayName" required value={displayName} onChange={this.handleInputChange} />
            </div>

            <div className=''>
              <label htmlFor="password">Password:</label>
              <input className='' type="password" name="password" required value={password} onChange={this.handleInputChange} />
            </div>

            <div className=''>
              <label htmlFor="passwordReap">Repeat Password:</label>
              <input className='' type="password" name="passwordReap" required value={passwordReap} onChange={this.handleInputChange} />
            </div>
          
            <div className=''>
              <label htmlFor="email">Email :</label>
              <input className='' type="email" name="email" required value={email} onChange={this.handleInputChange} />
            </div>
            

            {/* to prevent spamm we disable the button while the request is fetching */}
            <div className=''>
            <Button disabled={isFetching}  children='Registrate' className=''/>
            </div>
          </form>
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
    isFetching: state.reg.isFetching,
    isRegistrated: state.reg.isRegistrated,
    message: state.reg.message,
  }
}
    
/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(Register);