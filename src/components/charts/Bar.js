import React from 'react'


export default class Bar extends React.Component {
  static propTypes = {
    fill: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    size: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    yScale: React.PropTypes.func.isRequired,
  }

  render () {
    const { fill, width, yScale, size, value } = this.props
    const y = yScale(value)
    const height = size.height - y
    return (
      <rect {...{ width, height, fill, y }} />
    )
  }
}
