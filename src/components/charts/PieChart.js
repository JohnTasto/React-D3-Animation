import React from 'react'
import * as d3 from 'd3'


export default class PieChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    margin: React.PropTypes.object.isRequired,
    size: React.PropTypes.object.isRequired,
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

  buildDataSeries (data, size) {
    const radius = Math.min(size.width, size.height) / 2
    const innerRadius = radius * 0.125
    const outerRadius = radius * 0.875
    return (
      <g transform={`translate(${size.width / 2}, ${size.height / 2})`}>
        {this.buildSlices(data, innerRadius, outerRadius)}
      </g>
    )
  }

  render () {
    const { size, margin, data } = this.props
    const view = {
      width: size.width - margin.right - margin.left,
      height: size.height - margin.top - margin.bottom,
    }
    return (
      <svg viewBox={`0 0 ${size.width} ${size.height}`}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {this.buildDataSeries(data, view, margin)}
        </g>
      </svg>
    )
  }
}
