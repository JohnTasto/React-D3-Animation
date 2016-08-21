import React, { Component } from 'react'
import * as d3 from 'd3'


export default (dataProp, transitionDuration = 300) => ComposedComponent => class extends Component {
  constructor (props) {
    super(props)
    const data = this.props[dataProp]
    this.state = Object
      .keys(data)
      .map(label => ({ [label]: data[label] }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {})
  }

  componentWillReceiveProps (nextProps) {
    const data = this.props[dataProp]
    const nextData = nextProps[dataProp]
    const dataUnchanged = Object
      .keys(data)
      .map(label => data[label] === nextData[label])
      .reduce((prev, curr) => (prev && curr))
    if (dataUnchanged) return
    d3.select(this)
      .transition()
      .tween('attr.scale', null)
    d3.select(this)
      .transition()
      .duration(transitionDuration)
      .ease(d3.easeLinear)
      .tween('attr.scale', () => {
        const interpolators = Object
          .keys(data)
          .map(label => {
            const interpolator = d3.interpolateNumber(this.state[label], nextData[label])
            return { label, interpolator }
          })
        return t => {
          const newState = interpolators
            .map(({ label, interpolator }) => ({ [label]: interpolator(t) }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {})
          this.setState(newState)
        }
    })
  }

  render () {
    const { props, state } = this
    const newDataProps = { ...{data: state }}
    const newProps = { ...props, ...newDataProps }
    return (
      <ComposedComponent {...newProps} />
    )
  }
}
