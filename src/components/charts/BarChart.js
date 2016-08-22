import React from 'react'
import * as d3 from 'd3'

import BarSeries from './BarSeries'
import VerticalAxis from './VerticalAxis'
import HorizontalAxis from './HorizontalAxis'
import AnimatedScaleWrapper from './AnimatedScaleWrapper'


const AnimatedVerticalAxis = AnimatedScaleWrapper(['scale'])(VerticalAxis)
const AnimatedBarSeries = AnimatedScaleWrapper(['yScale'])(BarSeries)


export default class BarChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    margin: React.PropTypes.object.isRequired,
    size: React.PropTypes.object.isRequired,
  }

  buildHorizontalAxis (size, margin, scale) {
    const orientation = HorizontalAxis.orientation.BOTTOM
    const tickValues = scale.domain()
    const labelFn = value => value
    return (
      <HorizontalAxis {...{ scale, margin, size, tickValues, orientation, labelFn }} />
    )
  }

  buildVerticalAxis (size, margin, scale) {
    const orientation = VerticalAxis.orientation.LEFT
    const tickValues = scale.ticks()
    const labelFn = value => value
    return (
      <AnimatedVerticalAxis {...{ scale, margin, size, tickValues, orientation, labelFn }} />
    )
  }

  buildBars (data, size, margin, xScale, yScale) {
    return (
      <AnimatedBarSeries {...{ data, margin, size, xScale, yScale }} />
    )
  }

  render () {
    const { size, margin, data } = this.props
    const view = {
      width: size.width - margin.right - margin.left,
      height: size.height - margin.top - margin.bottom,
    }
    const yExtent = Object
      .keys(data)
      .map(label => data[label])
      .reduce(([min, max], curr) =>
        [Math.min(curr, min), Math.max(curr, max)], [Infinity, -Infinity] )
    const xScale = d3.scaleBand()
      .domain(Object.keys(data).sort())
      .range([0, view.width])
    const yScale = d3.scaleLinear()
      .domain([0, yExtent[1]])
      .range([view.height, 0])
    return (
      <svg viewBox={`0 0 ${size.width} ${size.height}`}>
        <g transform={`translate(${margin.top}, ${margin.left})`}>
          {this.buildHorizontalAxis(view, margin, xScale)}
          {this.buildVerticalAxis(view, margin, yScale)}
          {this.buildBars(data, view, margin, xScale, yScale)}
        </g>
      </svg>
    )
  }
}
