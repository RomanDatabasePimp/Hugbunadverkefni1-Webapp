/* ------------------------------------------------------------------------------
   ------------------------IMPORTS START-----------------------------------------
   ------------------------------------------------------------------------------*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom'
import NotFound from './routers/notFound';

import UserRoute from './components/user-route';
import Home from './routers/home';
import Login from './routers/login';
import Register from './routers/register';
import AccValidation from './routers/AccountValidation';
import {Grid,Row} from 'react-bootstrap';
import './App.css';

/* ------------------------------------------------------------------------------
   ------------------------IMPORTS End-------------------------------------------
   ------------------------------------------------------------------------------*/

/* Virknin á App er að það á að sjá um að byrta þau Routes sem verða i notkun
  og þeir Routes sem eru byrt munu sjá um sýna eigin virkni (önnur routes eða Componenta) */   
class App extends Component {
    render() {
      return (
        /* NOTICE PLEASE i am using BOOTSTRAP */
        <Grid>
          <Row>
            {/* The title of our webapp is always VeryWow - XXX  */}
            <Helmet defaultTitle='VeryWowChat' titleTemplate='VeryWow - %s '/>
            {/* The switch will decide what route to display */}
            <Switch location={this.props.location}>

              {/* if you try to go url/ the Login route will be displayed */}
              <Route path='/login' exact component={Login} />
              {/*  */}
              <Route path='/register' exact component={Register} />

              {/* This is For validation from emailLink */}
              <Route path='/validation/:key' exact component={AccValidation} />
              
              {/* UserRoute is smth that will check first if you are logged in i.e user and token exists in local storage
                  before giving you acces to the router, so you this style if you want to have ur user logged in 
                  so f.x we want to ensure our user is athenticated before he is given acces to Home route */}
              <UserRoute path='/' authenticated={this.props.isAuthenticated} component={Home} Redirection="/login" />
              
              {/* if nothing was matched then we return a notfound Route */}
              <Route component={NotFound} />
            </Switch>
          </Row>
        </Grid>
      );
    }
  }

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userActions.isAuthenticated,
  }
}

/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default withRouter(connect(mapStateToProps)(App));