import React from 'react'


export default class HorizontalAxis extends React.Component {
  static propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.array.isRequired,
    margin: React.PropTypes.object.isRequired,
    size: React.PropTypes.object.isRequired,
  }

  static orientation = {
    BOTTOM: 'horizontal-axis-bottom',
    TOP: 'horizontal-axis-top',
  }

  buildTicks (tickValues, scale, labelFn, orientation, margin) {
    const bandWidth = scale.bandwidth()
    return tickValues.map((tickValue, key) => {
      const xPos = scale(tickValue) + bandWidth / 2
      let tickLength, y1, y2
      if (orientation === HorizontalAxis.orientation.BOTTOM) {
        tickLength = margin.left / 6
        y2 = tickLength
        y1 = 0
      } else {
        tickLength = margin.right / 6
        y2 = margin.right
        y1 = y2 - tickLength
      }
      return (
        <g transform={`translate(${xPos}, 0)`} key={key}>
          <line
              {...{ y1, y2 }}
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
          >
            {labelFn(tickValue)}
          </text>
        </g>
      )
    })
  }

  render () {
    const { scale, size, margin, labelFn, tickValues, orientation } = this.props
    const yPos = (orientation === HorizontalAxis.orientation.TOP) ? 0 : size.height
    return (
      <g transform={`translate(0, ${yPos})`}>
        <line
            className="chart__axis-line chart__axis-line--horizontal"
            x1={0}
            y1={0}
            x2={size.width}
            y2={0}
        />
        {this.buildTicks(tickValues, scale, labelFn, orientation, margin)}
      </g>
    )
  }
}
