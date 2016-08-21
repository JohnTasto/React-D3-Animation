import React from 'react'


export default class Bar extends React.Component {
  static propTypes = {
    fill: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    view: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    yScale: React.PropTypes.func.isRequired,
  }

  render () {
    const {fill, width, yScale, view, value} = this.props
    const y = yScale(value)
    const height = view[1] - y
    return (
      <rect {...{width, height, fill, y}} />
    )
  }
}
