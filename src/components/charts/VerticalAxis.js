import React from 'react'


export default class VerticalAxis extends React.Component {
  static propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.array.isRequired,
    margin: React.PropTypes.object.isRequired,
    size: React.PropTypes.object.isRequired,
  }

  static orientation = {
    LEFT: 'horizontal-axis-left',
    RIGHT: 'horizontal-axis-right',
  }

  buildTicks(tickValues, scale, labelFn, orientation, margin) {
    return tickValues.map((tickValue, key) => {
      const tickLength = margin.top / 6
      const yPos = scale(tickValue)
      let x1, x2, anchorPosition, textXPos
      if (orientation === VerticalAxis.orientation.RIGHT) {
        x1 = 0
        x2 = tickLength
        anchorPosition = 'start'
        textXPos = x1 - tickLength
      } else {
        x2 = margin.top
        x1 = x2 - tickLength
        anchorPosition = 'end'
        textXPos = x1 - tickLength
      }
      return (
        <g transform={`translate(0, ${yPos})`} key={key}>
          <line
              {...{ x1, x2 }}
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
          >
            {labelFn(tickValue)}
          </text>
        </g>
      )
    })
  }

  render () {
    const { scale, size, margin, labelFn, tickValues, orientation } = this.props
    let width = margin.left
    let xPos = -width
    let x1 = width
    if (orientation === VerticalAxis.orientation.RIGHT) {
      width = margin.right // refactor, might be a bug here, haven't checked
      xPos = size.width
      x1 = 0
    }
    const x2 = x1
    return (
      <g transform={`translate(${xPos}, 0)`}>
        <line
            {...{ x1, x2 }}
            className="chart__axis-line chart__axis-line--vertical"
            y1={0}
            y2={size.height}
        />
        {this.buildTicks(tickValues, scale, labelFn, orientation, margin)}
      </g>
    )
  }
}
