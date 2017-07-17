import { combineReducers } from 'redux'
import * as actionTypes from '../constants/userinfo'
import { USERINFO_UPDATE } from '../actions/userinfo' 

const initialState = {}
function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data
        default:
            return state
    }
}
export default combineReducers({
    userinfo
})
