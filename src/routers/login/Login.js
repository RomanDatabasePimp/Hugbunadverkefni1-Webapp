import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loginUser, logoutUser, resetAuthState  } from '../../actions/userActions';
import Helmet from 'react-helmet';
import Button from '../../components/button';

class Login extends Component {
  
  state = {
    username: '', // nafn af notanda sem er að skrá sig inn
    password: '', // lykillorð notanda sem er að skrá sig inn
  }

  /* Ef notandi t.d reyndi logga inn og það failaði þá myndu villu meldingar byrtast
    svo ef hann myndi fara á aðra siðu og til baka á login þá villu meldingar voru ennþá til staðar
    þetta kemur i veg að villumeldingar myndu vera ennþá þarna */
  async componentDidMount() {
    const { dispatch , isAuthenticated } = this.props;
    // ef notandi er ekki skráður þá þarf að hreinsa store
    if (!isAuthenticated) { dispatch(resetAuthState()); }
  }

  /* Notkun : this.handleInputChange
     Fyrir  : e er input html element
              sem hefur name sem username/password, value er strengur
     Efitr  : Uppfærir stöðu username/password með value sem var gefið */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) { this.setState({ [name]: value }); }
  }

  /* Notkun : this.handleSubmit
     Fyrir  : ekkert
     Eftir  : gerir action loginUser með notanda upplýsingum */
  handleSubmit = async (e) => {
    e.preventDefault(); // slökkva á default hegðun á formi
    const { dispatch } = this.props;
    const { username, password } = this.state;
    const data = {
      username,
      password,
    };
    dispatch(loginUser(data));
  }


  render() {
    // þurfum að sækja allar stoður
    const { username, password } = this.state;
    /* þetta eru  indicators sem tákna hvað er að gerast i ferli
       t.d ef loginIsFeatching er satt þá eru gögn ennþá i vinslu 
              isAuthenticated þyðir að login tókst
              loginErrorMsg þyðir að loggin mistókst eða eitthvað sem skilar villu hefur komið framm*/
    const { loginIsFetching, isAuthenticated, loginErrorMsg } = this.props;
    // ef gögn eru i vinslu þá byrtum við the Doge loading
    if (loginIsFetching) {
      return (<div className='main_wrapper'><span>Skrái inn...</span><Helmet title='Skrái inn...'></Helmet></div>);
    }
    /* ef innskráning tókst þá er uppfært isAuthenticated þ.a við getum bara visað
       notandan á /home og app.js mun sjá um rest */ 
    if (isAuthenticated) { return (<Redirect to="/home" />); }

    // ef hann er ekki skráður inn þá byrtum innskráningar form
    return (
      <div className='form_wrapper col-sm-8 col-md-8 col-lg-10'>
        <Helmet title='Login'></Helmet>
        <h1>VeryWow Login </h1>
        <form className='col-xs' onSubmit={this.handleSubmit}>
          <div className='box'>
            <label  htmlFor="username">User name:</label>
            <input  className='' type="text" name="username" required value={username} onChange={this.handleInputChange} />
          </div>
          <div className='box'>
            <label  htmlFor="password">Password:</label>
            <input  className='' type="text" name="password" required value={password} onChange={this.handleInputChange} />
          </div>
          <Button disabled={loginIsFetching}  children='Login' className='box start-xs'/>
        </form>
      </div>
    );
  }
}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
    loginIsFetching: state.userActions.loginIsFetching,
    isAuthenticated: state.userActions.isAuthenticated,
    loginErrorMsg: state.userActions.loginErrorMsg,
  }
}

/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(Login);
