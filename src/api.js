require('dotenv').config();

/* sótt Url úr .env skjali */
const {
  // ef þið gleymdu að bæta i .evn 
  APP_SERVICE_URL: baseurl = 'http://locahost:8080',
} = process.env;

/* Notkun : nodatarequest(endpoint, method)
   Fyrir  : endpoint er strengur
            method er strengur sem á að vera GET - DELETE
   Eftir  : Gerir method Request á baseurlið/endpoint 
            og skilar json obj sem Serverin skilar ásamt statuskóða */
export async function nodatarequest(endpoint, method) {
  // sótt er Token sem er geymdur i  local storage
  const token = window.localStorage.getItem('token');
  // samskeytt saman Url 
  const url = `${baseurl}${endpoint}`;
  // stillingar fyrir fyrirspurnir
  const options = {
    headers: { },
    method: method,
  };
  let response = null;
  /* ef tóken er til það er sett hann með Get fyrirspurni
    annars það er bara sent urlið */
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    response = await fetch(url, options);
  } else {
    response = await fetch(url);
  }
  /* ef statur kóðin væri 204 það þyðir að það kom ekkert result með
     þannig við skilum null og status kóða */
  if(response.status === 204) {
    return { result: null, status: response.status };
  }
  // ef status kóði er ekki 204 þá eru til einhverskonar gögn frá vefjónustuni og við skilum þau
  
  // sótt json frá server
  const result = await response.json();

  // skilum json obj og status kóða sem var fært
  return { result, status: response.status };
}

/* Notkun : datarequest(endpoint, data, method)
   Fyrir  : endpoint er strengur
            data er json obj með mismunandi properties
            method er strengur
   Efitir : frammkvæmir method fyrirspurn með data sem ver sent
            og skilar json obj og status kóða sem Server skilaði */
export async function datarequest(endpoint, data, method) {
  // sótt er Token sem er geymdur i  local storage
  const token = window.localStorage.getItem('token');
  // buið til url sem við viljum senda á
  const url = `${baseurl}${endpoint}`;
  
  //stillingar fyrirspurnir
  const options = {
    body: JSON.stringify(data), //gögn frá body verða vera á json formi
    headers: {
      'content-type': 'application/json', // segjum að við erum að senda json
    },
    method: method, // taka framm að þetta er post fyrirspurn
  };

  let response = null;
  /* ef tóken er til það er sett hann með Get fyrirspurni
    annars það er bara sent urlið */
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    response = await fetch(url, options);
  } else {
    response = await fetch(url,options);
  }
  // sækja json obj frá heroku
  const result = await response.json();
  // skilað json obj og status kóðan
  return { result, status: response.status };
}

/* Notkun : formdatarequest(endpoint, data)
    Fyrir : endpoint er strengur
            data er gögn úr body
    Eftir : frammkvæmir PATCH fyrir spurn með data
            og skilar json obj og status kóðan */
export async function formdatarequest(endpoint, data) {
  // sótt er Token sem er geymdur i  local storage
  const token = window.localStorage.getItem('token');
  // buið til url sem við viljum senda á
  const url = `${baseurl}${endpoint}`;

  //stillingar fyrirspurnir
  const options = {
    body: data, //gögn frá body
    method: 'POST',
    headers: {},
  };

  options.headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(url, options);
  
  // sækja json obj frá heroku
  const result = await response.json();
  // skilað json obj og status kóðan
  return { result, status: response.status };
}