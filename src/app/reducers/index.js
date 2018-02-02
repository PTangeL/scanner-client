import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const createReducers = reducers =>
  combineReducers({
    form: formReducer,
    ...reducers
  })

export default createReducers
