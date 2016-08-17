import { datasetConstants } from '../actions'

export default (state = {activeDatasetIndex: 0}, action) => {
  if (action.type === datasetConstants.CHANGE_INDEX) {
    const activeDatasetIndex = action.index
    return {...state, ...{activeDatasetIndex}}
  }
  return state
}
