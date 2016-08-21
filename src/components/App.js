import React from 'react'
import { connect } from 'react-redux'

import datasetActions from '../actions/dataset'
import DatasetSelect from './DatasetSelect'
import { AnimatedBarChart } from './charts/BarChart'
import { AnimatedPieChart } from './charts/PieChart'
import { countEntries } from '../utilities'

import './App.scss'


class App extends React.Component {
  static propTypes = {
    activeDatasetIndex: React.PropTypes.number.isRequired,
    switchDataset: React.PropTypes.func.isRequired,
    // datasets: React.PropTypes.array.isRequired,
    route: React.PropTypes.object.isRequired,
  }

  render () {
    const {route: {datasets}, activeDatasetIndex, switchDataset} = this.props
    const data = datasets[activeDatasetIndex]
    return (
      <div className="container-fluid">
        <h1>{'Select Dataset'}</h1>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <DatasetSelect {...{datasets, activeDatasetIndex, switchDataset}} />
          </div>
          <div className="col-sm-4 col-lg-4">
            <AnimatedPieChart {...{data: countEntries(data), size: [320, 320], margins: [10, 10, 10, 10]}} />
          </div>
          <div className="col-sm-5 col-lg-6">
            <AnimatedBarChart {...{data: countEntries(data), size: [480, 320], margins: [42, 42, 42, 42]}} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state, {datasets}) => {
  const {datasetSelect: {activeDatasetIndex}} = state
  return {
    activeDatasetIndex,
    datasets,
  }
}, {
  switchDataset: datasetActions.changeIndex,
})(App)
