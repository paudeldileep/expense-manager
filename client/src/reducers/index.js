import {combineReducers} from 'redux';
import alert from './alert'
import auth from './auth'
import expense from './expense'
export default combineReducers({
   alert,
   auth,
   expense
});