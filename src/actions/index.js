import { FETCH_USER, LOGOUT, FETCH_QUESTION, FETCH_STREAK } from "./types"
import URL_ROOT from './URL'

  export const token = localStorage.getItem('token');

  export const headers = {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token
    };


  export const handleErrors = (response) => {
    console.log(response)
    if (!response.ok) throw Error(response.statusText);
    return response
  }

  //=================================================USER FUNCTIONS

  export const getCurrentUser = (email, password) => {
  return dispatch => fetch(`${URL_ROOT}current_user`, 
    { headers })
    .then(handleErrors)
    .then(res => res.json())
    .then(res => { dispatch({type: FETCH_USER, payload: res}) })
    .catch(function(error) {
      console.log(error);
    })
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
      })
      .then(res => res.json())
      .then(res => {
          dispatch({type: FETCH_QUESTION, payload: res})
      })
      }
  }

    //=================================================STREAK FUNCTIONS

  export const fetchStreak = user_id => {
    return dispatch => {
      fetch(`${URL_ROOT}users/${user_id}/current_streak`, {
        method: 'GET',
        headers: headers,
      })
      .then(res => res.json())
      .then(res => {
        console.log('getting streak from controller', res)
        dispatch({type: FETCH_STREAK, payload: res.current_streak})
      })
      }
  }









