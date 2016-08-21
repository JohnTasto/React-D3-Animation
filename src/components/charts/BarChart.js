import React from 'react'
import * as d3 from 'd3'

import { AnimatedBarSeries } from './BarSeries'
import VerticalAxis, { AnimatedVerticalAxis } from './VerticalAxis'
import HorizontalAxis from './HorizontalAxis'
import AnimatedDataWrapper from './AnimatedDataWrapper'


export default class BarChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    margins: React.PropTypes.array.isRequired,
    size: React.PropTypes.array.isRequired,
  }

  buildBars (data, view, margins, xScale, yScale) {
    return (
      <AnimatedBarSeries {...{ data, margins, view, xScale, yScale }} />
    )
  }

  buildVerticalAxis (view, margins, scale) {
    const orientation = VerticalAxis.orientation.LEFT
    const tickValues = scale.ticks()
    const labelFn = value => value
    return (
      <AnimatedVerticalAxis {...{ scale, margins, view, tickValues, orientation, labelFn }} />
    )
  }

  buildLinearScale ([domainMin, domainMax], range) {
    return d3.scaleLinear()
      .domain([domainMin, domainMax])
      .range(range)
  }

  buildBandScale (domain, range) {
    return d3.scaleBand()
      .domain(domain)
      .rangeRound(range)
  }

  buildHorizontalAxis (view, margins, scale) {
    const orientation = HorizontalAxis.orientation.BOTTOM
    const tickValues = scale.domain()
    const labelFn = value => value
    return (
      <HorizontalAxis {...{ scale, margins, view, tickValues, orientation, labelFn }} />
    )
  }

  render () {
    const { size, margins, data } = this.props
    const width = size[0] - margins[1] - margins[3]
    const height = size[1] - margins[0] - margins[2]
    const view = [width, height]
    const yExtent = Object
      .keys(data)
      .map(label => data[label])
      .reduce(([min, max], curr) =>
        [Math.min(curr, min), Math.max(curr, max)], [Infinity, -Infinity] )
    const xScale = d3.scaleBand()
      .domain(Object.keys(data).sort())
      .range([0, width])
    const yScale = d3.scaleLinear()
      .domain([0, yExtent[1]])
      .range([height, 0])
    const viewBox = `0 0 ${size[0]} ${size[1]}`
    const transform = `translate(${margins[0]}, ${margins[3]})`
    return (
      <svg {...{ viewBox }}>
        <g {...{ transform }}>
          {this.buildHorizontalAxis(view, margins, xScale)}
          {this.buildVerticalAxis(view, margins, yScale)}
          {this.buildBars(data, view, margins, xScale, yScale)}
        </g>
      </svg>
    )
  }
}

export const AnimatedBarChart = AnimatedDataWrapper('data')(BarChart)
