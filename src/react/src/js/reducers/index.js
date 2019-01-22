import { combineReducers } from 'redux'
import postReducer from './postReducer'
import CamperReducer from './CamperReducer'

export default combineReducers({
  posts: postReducer,
  camper: CamperReducer
})
