import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'

import datasetSelectReducer from './datasetSelectReducer'


export default combineReducers({
  datasetSelect: datasetSelectReducer,
  routing: routerReducer,
})
