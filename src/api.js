require('dotenv').config();

/* fetched from the .evn file */
const { 
  APP_SERVICE_URL: baseurl  = 'http://localhost:9090/',// just incase if you forgget the env file
} = process.env;

/* Usage : noDataRequest(endpoint, method)
   For   : endpoint is a string
            method string represents a HTTP Method
   After : performs the method on  baseur/endpoint 
            and returns the json obj with the status code */
export async function noDataRequest(endpoint, method) {
  // If the token exists we will send it along
  const token = window.localStorage.getItem('token');
  // concat our wanted url
  const url = `${baseurl}${endpoint}`;
  // options for the http request
  const options = {
    headers: { },
    method: method,
  };
  let response = null;
  /* if we have the JWT we send it along sometimes u dont want and sometimes
     you need so insted of making two different functions its better just send
     the token along for the ride */
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    response = await fetch(url, options);
  } else {
    response = await fetch(url);
  }
  /* if the status code is 204 then we know there was not result */
  if(response.status === 204) { return { result: null, status: response.status }; }
  /* Since we are 3 working on the Spring Boot api we have a rule that everything we send out
     has to be wrapped to handle it better on this end  we have 2 wrappers BadResp and GoodResp 
     There could be anything inside these responses (looks stupid but we need to have somekind of rule) */   
  let result = await response.json();
  /* Spring boot has its own handler for many various unimplemented or server error responses so we need 
    implement somekind of catch for that so our react wont go ups  its own ass*/
  if(result.hasOwnProperty("message")){ return { result: null, status: response.status }; }
  // check whitch wrapper do we peel
  if(response.status >= 200 && response.status < 300 ) { result = result.GoodResp; }
  if(response.status >= 400 && response.status < 500 ) { result = result.BadResp; }
  // return the json  along with the status code
  return { result, status: response.status };
}

/* Usage  : datarequest(endpoint, data, method)
   For    : endpoint is a string
            data is a json obj with various properties
            method string represents a HTTP Method
   After  : Processes the http method and send the data along and returns
            json obj with a status code */
export async function datarequest(endpoint, data, method) {
  // Again same thing with the token if it exists we take it with us
  const token = window.localStorage.getItem('token');
  // create the url
  const url = `${baseurl}${endpoint}`;
  // set our options
  const options = {
    body: JSON.stringify(data), // data from body will be in json format
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:9090',
      'Access-Control-Allow-Credentials': 'true',
      'content-type': 'application/json', // tell that we are sending json
    },
    method: method, // specify our method
  };
  let response = null;
  /* again same stuff with the token */
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    response = await fetch(url, options);
  } else {
    response = await fetch(url,options);
  }
  // same proccess as in noDataRequest
  let result = await response.json();
  if(result.hasOwnProperty("message")){ return { result: null, status: response.status }; }
  // check whitch wrapper do we peel
  if(response.status >= 200 && response.status < 300 ) { result = result.GoodResp; }
  if(response.status >= 400 && response.status < 500 ) { result = result.BadResp; }
  // return the json  along with the status code
  return { result, status: response.status };
}