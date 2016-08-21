import React from 'react'

import AnimatedScaleWrapper from './AnimatedScaleWrapper'


export default class VerticalAxis extends React.Component {
  static propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.array.isRequired,
    margins: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired,
  }

  static orientation = {
    LEFT: 'horizontal-axis-left',
    RIGHT: 'horizontal-axis-right',
  }

  buildTicks (tickValues, scale, labelFn, margins, view, orientation) {
    return tickValues.map((tickValue, key) => {
      const tickLength = view[0] / 6
      const yPos = scale(tickValue)
      let x2 = view[0]
      let x1 = x2 - tickLength
      let anchorPosition = 'end'
      let textXPos = x1 - tickLength
      if (orientation === VerticalAxis.orientation.RIGHT) {
        x1 = 0
        x2 = tickLength
        anchorPosition = 'start'
      }
      const transform = `translate(0, ${yPos})`
      return (
        <g transform={transform} key={key}>
          <line
              {...{x1, x2}}
              className="chart__axis-tick chart__axis-tick--vertical"
              y1={0}
              y2={0}
          />
          <text
              dy={3}
              className="chart__axis-text chart__axis-text--vertical"
              textAnchor={anchorPosition}
              x={textXPos}
              y={0}
          >{labelFn(tickValue)}</text>
        </g>
      )
    })
  }

  render () {
    const {scale, view, margins, labelFn, tickValues, orientation} = this.props
    let width = margins[3]
    let xPos = -width
    let x1 = width
    if (orientation === VerticalAxis.orientation.RIGHT) {
      width = margins[1] // refactor, might be a bug here, haven't checked
      xPos = view[0]
      x1 = 0
    }
    const x2 = x1
    const transform = `translate(${xPos}, 0)`
    return (
      <g {...{transform}}>
        <line
            {...{x1, x2}}
            className="chart__axis-line chart__axis-line--vertical"
            y1={0}
            y2={view[1]}
        />
        {this.buildTicks(tickValues, scale, labelFn, orientation, margins)}
      </g>
    )
  }
}

export const AnimatedVerticalAxis = AnimatedScaleWrapper(['scale'])(VerticalAxis)
