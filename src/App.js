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
import HttpTest from './routers/HttpTest';
import './App.css';

/* ------------------------------------------------------------------------------
   ------------------------IMPORTS End-------------------------------------------
   ------------------------------------------------------------------------------*/


/* Virknin á App er að það á að sjá um að byrta þau Routes sem verða i notkun
  og þeir Routes sem eru byrt munu sjá um sýna eigin virkni (önnur routes eða Componenta) */   
class App extends Component {

    render() {
      
      return (
        /* NOTICE PLEASE i am using flex box pakage so the css code is not in any .css files  */
        <main className='main row center-xs'>
          {/* Tiltill á vefsiðuni verður alltaf (nafn af appi) - xxx  */}
          <Helmet defaultTitle='VeryWowChat' titleTemplate='VeryWow - %s ' />
      <HttpTest></HttpTest>
          {/* allt innihald siðu er birtur i þessum element 
            það verður athugað slóðina sem notandi er staddur á
            og switch og Router munu sjá um að byrta réttan route */}
          <div className="">
            <Switch location={this.props.location}>
              <Route path='/login' exact component={Login} />
              {/* UserRoute er componenti sem chekkar hvort notandi er skráður inn
                  eða ekki og ef hann er skráður inn þá er visað honum i chatt appið
                  annars visar hann á loggin siðuna */}
              <UserRoute path='/' authenticated={this.props.isAuthenticated} component={Home} />
              {/* S.S til að koma i veg fyrir að notandi gæti búið til ny accounts á meðan hann er skráður inn
                  við neyðum hann að fara yfir UserRoute en við neitum isAuthenticated 
                  <UserRoute path='/register' authenticated={!this.props.isAuthenticated} component={Home} />
                  */}
              
              {/* ef ekkert af þessu passaði þá er byrt villu siðu */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
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