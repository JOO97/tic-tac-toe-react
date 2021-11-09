import React from 'react'

import Square from './Square'

const arr = Array(3).fill(null)
let i = -1

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i)
        }}
        active={this.props.activeIndex.includes(i)}
      />
    )
  }
  render() {
    return (
      <div>
        {arr.map((item, index) => {
          return (
            <div className="board-row" key={index}>
              {React.Children.map(arr, (child, index2) => {
                i++
                const r = this.renderSquare(i)
                if (i === 8) {
                  i = -1
                }
                return r
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Board
