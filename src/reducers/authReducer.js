import { FETCH_USER, LOGOUT } from '../actions/types'

export default function(state = null, action) {
    console.log('action', action)
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false
        case LOGOUT:
            localStorage.removeItem('token')
            return;
        default:
            return state;
    }
}