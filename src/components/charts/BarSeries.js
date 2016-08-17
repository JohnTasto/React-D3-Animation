import React from 'react'

import Bar from './Bar'
import AnimatedScaleWrapper from './AnimatedScaleWrapper'


export default class BarSeries extends React.Component {
  static propTypes = {
    // data: React.PropTypes.array.isRequired,
    data: React.PropTypes.object.isRequired,
    margins: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
  }

  buildBars (data, view, margins, xScale, yScale) {
    const step = xScale.step()
    const width = xScale.bandwidth() - xScale.paddingInner()
    const fill = 'steelblue'
    return xScale.domain().map((label) => {
      const value = data[label]
      const xPos = xScale(label)
      return (
        <g key={label} transform={`translate(${xPos}, 0)`}>
          <Bar {...{view, fill, width, yScale, value}} />
        </g>
      )
    })
  }

  render () {
    const {margins, view, data, xScale, yScale, year} = this.props
    const [width, height] = view
    xScale.paddingOuter(0.125)
    xScale.paddingInner(0.125)
    const transform = `translate(${xScale.paddingOuter()}, 0)`
    return (
      <g {...{transform}}>
        {this.buildBars(data, view, margins, xScale, yScale)}
      </g>
    )
  }
}

export const AnimatedBarSeries = AnimatedScaleWrapper(['yScale'])(BarSeries)
