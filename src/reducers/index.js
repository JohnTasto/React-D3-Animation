import { combineReducers, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import datasetSelectReducer from './datasetSelectReducer.js'

export default initialState => {
  const reducers = combineReducers({
    datasetSelect: datasetSelectReducer
  })
  return createStore(reducers, initialState, applyMiddleware(ReduxThunk))
}
