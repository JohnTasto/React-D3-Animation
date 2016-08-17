import { datasetConstants } from './index'

export default {
  changeIndex: (index) => {
    return dispatch => dispatch({
      type: DatasetConstants.CHANGE_INDEX,
      index,
    })
  }
}
