import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({component: Component,Redirection, authenticated, ...rest}) => {
  return (
    /* S.S þetta er middleware sem ath first hvort notandi er skráður inn eða ekki
      en notandin er ekki skráður inn þá er visað hann á /login istað 
      en ef hann er skráður inn þá er visað hann yfir /location */
    <Route
      {...rest}
      render={(props) => authenticated
        ? <Component {...props} />
        : <Redirect to={{pathname:Redirection, state: {from: props.location}}} />}
    />
  )
}