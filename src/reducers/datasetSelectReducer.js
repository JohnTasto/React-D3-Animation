import { datasetConstants } from '../actions'

export default (state = { activeDatasetIndex: 0 }, action) => {
  if (action.type === datasetConstants.CHANGE_INDEX) {
    return { ...state, activeDatasetIndex: action.index }
  }
  return state
}
