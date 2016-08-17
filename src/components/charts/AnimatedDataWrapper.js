import React from 'react'
import { select, easeLinear, interpolateNumber } from 'd3'


export default (dataProp, transitionDuration = 300) => ComposedComponent => class extends React.Component {
  constructor (props) {
    super(props)
    const data = this.props[dataProp]
    this.state = Object.keys(data).map(label => ({[label]: data[label]})).reduce((prev, curr) => ({...prev, ...curr}), {})
  }

  componentWillReceiveProps (nextProps) {
    const data = this.props[dataProp]
    const nextData = nextProps[dataProp]
    const dataUnchanged = Object.keys(data).map(label => data[label] === nextData[label]).reduce((prev, curr) => (prev && curr))
    if (dataUnchanged) {
      return
    }
    select(this).transition().tween('attr.scale', null)
    select(this).transition().duration(transitionDuration).ease(easeLinear).tween('attr.scale', () => {
      const interpolators = Object.keys(data).map(label => {
        const interpolator = interpolateNumber(this.state[label], nextData[label])
        return {label, interpolator}
      })
      const interpolator = interpolateNumber(this.state[`${dataProp}Value`], nextProps[dataProp])
      return (t) => {
        const newState = interpolators.map(({label, interpolator}) => ({[label]: interpolator(t)})).reduce((prev, curr) => ({...prev, ...curr}), {})
        this.setState(newState)
      }
    })
  }

  render () {
    const {props, state} = this
    const newDataProps = {...{data: state}}
    const newProps = {...props, ...newDataProps}
    return (
      <ComposedComponent {...newProps} />
    )
  }
}
