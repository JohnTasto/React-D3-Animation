import { datasetConstants } from './index'

export default {
  changeIndex: (index) => {
    return dispatch => dispatch({
      type: datasetConstants.CHANGE_INDEX,
      index,
    })
  }
}
