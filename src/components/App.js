import React from 'react'
import { connect } from 'react-redux'

import datasetActions from '../actions/dataset'
import DatasetSelect from './DatasetSelect'
import BarChart from './charts/BarChart'
import PieChart from './charts/PieChart'
import AnimatedDataWrapper from './charts/AnimatedDataWrapper'
import { countEntries } from '../utilities'

import './App.scss'


const AnimatedPieChart = AnimatedDataWrapper('data')(PieChart)
const AnimatedBarChart = AnimatedDataWrapper('data')(BarChart)


const pieSize = { width: 320, height: 320 }
const barSize = { width: 400, height: 320 }

const pieMargin = { top: 10, bottom: 10, left: 10, right: 10 }
const barMargin = { top: 42, bottom: 42, left: 42, right: 42 }

class App extends React.Component {
  static propTypes = {
    activeDatasetIndex: React.PropTypes.number.isRequired,
    switchDataset: React.PropTypes.func.isRequired,
    // datasets: React.PropTypes.array.isRequired,
    route: React.PropTypes.object.isRequired,
  }

  render () {
    const { route: { datasets }, activeDatasetIndex, switchDataset } = this.props
    const data = datasets[activeDatasetIndex]
    return (
      <div className="container-fluid">
        <h1>{'Select Dataset'}</h1>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <DatasetSelect {...{ datasets, activeDatasetIndex, switchDataset }} />
          </div>
          <div className="col-sm-4 col-lg-4">
            <AnimatedPieChart {...{ data: countEntries(data), size: pieSize, margin: pieMargin }} />
          </div>
          <div className="col-sm-5 col-lg-6">
            <AnimatedBarChart {...{ data: countEntries(data), size: barSize, margin: barMargin }} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { activeDatasetIndex: state.datasetSelect.activeDatasetIndex }
}

export default connect(mapStateToProps, { switchDataset: datasetActions.changeIndex })(App)
