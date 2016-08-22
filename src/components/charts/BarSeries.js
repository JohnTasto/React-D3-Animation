import React from 'react'

import Bar from './Bar'


export default class BarSeries extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    margin: React.PropTypes.object.isRequired,
    size: React.PropTypes.object.isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
  }

  buildBars (data, size, margin, xScale, yScale) {
    // const step = xScale.step()
    const width = xScale.bandwidth() - xScale.paddingInner()
    const fill = 'steelblue'
    return xScale.domain().map(label => {
      const value = data[label]
      const xPos = xScale(label)
      return (
        <g key={label} transform={`translate(${xPos}, 0)`}>
          <Bar {...{ size, fill, width, yScale, value }} />
        </g>
      )
    })
  }

  render () {
    const {margin, size, data, xScale, yScale} = this.props
    xScale.paddingOuter(0.125)
    xScale.paddingInner(0.125)
    return (
      <g transform={`translate(${xScale.paddingOuter()}, 0)`}>
        {this.buildBars(data, size, margin, xScale, yScale)}
      </g>
    )
  }
}
