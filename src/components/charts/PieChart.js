import React from 'react'
import * as d3 from 'd3'

import AnimatedDataWrapper from './AnimatedDataWrapper'


export default class PieChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    margins: React.PropTypes.array.isRequired,
    size: React.PropTypes.array.isRequired,
  }

  buildSlices (data, innerRadius, outerRadius) {
    const pie = d3.pie()
      .padAngle(0.06)
      .sort(null)
    const labels = Object.keys(data)
    const values = labels.map(label => data[label])
    return pie(values).map((point, key) => {
      const arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius)
        .cornerRadius(10)
      const d = arc(point)
      const fill = 'steelblue' // refactor, this should be css
      const transform = `translate(${arc.centroid(point)})`
      const dy = '0.35em'
      const textAnchor = 'middle'
      return (
        <g key={key}>
          <path {...{ d, fill }} />
          <text {...{ transform, dy, textAnchor, stroke: 'none', fill: '#fff' }}>
            {labels[key]}
          </text>
        </g>
      )
    })
  }

  buildDataSeries (data, view) {
    const transform = `translate(${view[0] / 2}, ${view[1] / 2})`
    const radius = Math.min.apply(null, view) / 2
    const innerRadius = radius * 0.125
    const outerRadius = radius * 0.875
    return (
      <g transform={transform}>
        {this.buildSlices(data, innerRadius, outerRadius)}
      </g>
    )
  }

  render () {
    const { size, margins, data } = this.props
    const viewBox = `0 0 ${size[0]} ${size[1]}`
    const transform = `translate(${margins[3]}, ${margins[0]})`
    const width = size[0] - margins[1] - margins[3]
    const height = size[1] - margins[0] - margins[2]
    const view = [width, height]
    return (
      <svg viewBox={viewBox}>
        <g transform={transform}>
          {this.buildDataSeries(data, view, margins)}
        </g>
      </svg>
    )
  }
}

export const AnimatedPieChart = AnimatedDataWrapper('data')(PieChart)
