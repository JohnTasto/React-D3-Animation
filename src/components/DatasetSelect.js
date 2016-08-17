import React from 'react'


export default class extends React.Component {
  static propTypes = {
    activeDatasetIndex: React.PropTypes.number.isRequired,
    datasets: React.PropTypes.array.isRequired,
    switchDataset: React.PropTypes.func.isRequired,
  }

  onClick (datasetIndex) {
    return () => {
      this.props.switchDataset(datasetIndex)
    }
  }

  render () {
    return (
      <div>
        <form className="dataset-selector">
          <div className="radio">
            <label>
              <input
                  defaultChecked
                  name="step-select"
                  onClick={this.onClick(0)}
                  type="radio"
              /> <span className="step-select__label">{'Dataset A'}</span>
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                  name="step-select"
                  onClick={this.onClick(1)}
                  type="radio"
              /> <span className="step-select__label">{'Dataset B'}</span>
            </label>
          </div>
        </form>
      </div>
    )
  }
}
