import { FETCH_USER } from "./types"
import URL_ROOT from '../URL'


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
        dispatch({type: FETCH_USER, user: res})
      })
    }
  };





