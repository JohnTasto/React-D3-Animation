import React from 'react'

import AnimatedScaleWrapper from './AnimatedScaleWrapper'


export default class HorizontalAxis extends React.Component {
  static propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.array.isRequired,
    margins: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired,
  }

  static orientation = {
    BOTTOM: 'horizontal-axis-bottom',
    TOP: 'horizontal-axis-top',
  }

  buildTicks (tickValues, scale, labelFn, orientation, margins) {
    const bandWidth = scale.bandwidth()
    return tickValues.map((tickValue, key) => {
      const xPos = scale(tickValue) + bandWidth / 2
      let tickLength = margins[1] / 6
      let y2 = margins[1]
      let y1 = y2 - tickLength
      if (orientation === HorizontalAxis.orientation.BOTTOM) {
        tickLength = margins[3] / 6
        y2 = tickLength
        y1 = 0
      }
      const transform = `translate(${xPos}, 0)`
      return (
        <g {...{transform, key}}>
          <line
              {...{y1, y2}}
              className="chart__axis-tick chart__axis-tick--horizontal"
              x1={0}
              x2={0}
          />
          <text
              dy={'1.4em'}
              className="chart__axis-text chart__axis-text--horizontal"
              textAnchor={'middle'}
              x={0}
              y={0}
          >{labelFn(tickValue)}</text>
        </g>
      )
    })
  }

  render () {
    const {scale, view, margins, labelFn, tickValues, orientation} = this.props
    const [width, height] = view
    let yPos = height
    if (orientation === HorizontalAxis.orientation.TOP) {
      yPos = 0
    }
    const transform = `translate(0, ${yPos})`
    return (
      <g {...{transform}}>
        <line
            className="chart__axis-line chart__axis-line--horizontal"
            x1={0}
            y1={0}
            x2={width}
            y2={0}
        />
        {this.buildTicks(tickValues, scale, labelFn, orientation, margins)}
      </g>
    )
  }
}

export const AnimatedHorizontalAxis = AnimatedScaleWrapper(['scale'])(HorizontalAxis)
