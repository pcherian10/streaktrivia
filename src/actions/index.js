import { FETCH_USER, LOGOUT, FETCH_QUESTION } from "./types"
import URL_ROOT from './URL'

const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    Authorization: token
  };


//=================================================USER FUNCTIONS

export const getCurrentUser = (email, password) => {
  return dispatch => fetch(`${URL_ROOT}current_user`, 
    { headers })
    .then(res => res.json())
    .then(res => {
        dispatch({type: FETCH_USER, payload: res})
      });
}

export function addUser (user) {
    return dispatch => {
      fetch(`${URL_ROOT}users`, {
        method: 'POST',
        headers: headers,
        data: {},
        dataType: "JSON",
        body: JSON.stringify({ user })
      }).then(res => res.json())
      .then(res => {
        dispatch({type: FETCH_USER, payload: res})
      })
    }
  };

  export function login (email, password) {
    return dispatch => {
    fetch(`${URL_ROOT}auth`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email, password })
    }).then(res => res.json())
      .then(res => {
        localStorage.setItem('token', res.id)
        window.location.href = '/rankings';
        dispatch({type: FETCH_USER, payload: res})
      })
    }
   }
   
   export const logout = () => {
     return dispatch => {
       dispatch({type: LOGOUT })
     }
   }

  //=================================================QUESTION FUNCTIONS

  export const fetchQuestion = user => {
    return dispatch => {
      fetch(`${URL_ROOT}users/${user}/question`, {
        method: 'GET',
        headers: headers,
      }).then(res => res.json())
        .then(res => {
          dispatch({type: FETCH_QUESTION, payload: res})
        })
      }

  }









