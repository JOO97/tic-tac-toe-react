import React from 'react'

import Board from './Board'
import '../index.css'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        index: lines[i],
        role: squares[a],
      }
    }
  }
  return null
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      isAsc: true,
      winnerIndex: [],
    }
  }

  getCurrentData(isReset = false) {
    const { isAsc } = this.state
    let history = []
    if (isAsc) {
      history = this.state.history.slice(0, this.state.stepNumber + 1)
    } else {
      history = this.state.history.slice(
        this.state.stepNumber,
        this.state.history.length
      )
    }
    if (isReset) {
      this.setState({
        history,
      })
    }
    const current = history[isAsc ? history.length - 1 : 0]
    const squares = current.squares.slice()
    return {
      history,
      squares,
    }
  }

  /**
   * 点击棋盘
   */
  handleClick(i) {
    const { isAsc, stepNumber, history: h } = this.state
    const { history, squares } = this.getCurrentData(stepNumber !== h.length)
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    const x = Math.ceil((i + 1) / 3)
    const y = !((i + 1) % 3) ? 3 : (i + 1) % 3
    const index = i + 1
    this.setState({
      history: isAsc
        ? history.concat([
            {
              squares,
              x,
              y,
              index,
            },
          ])
        : [
            {
              squares,
              x,
              y,
              index,
            },
          ].concat(history),
      xIsNext: !this.state.xIsNext,
      stepNumber: isAsc ? history.length : 0,
    })
    this.setWinnerIndex(calculateWinner(squares))
  }

  jumpTo(index) {
    this.setState({
      stepNumber: index,
      xIsNext: index % 2 === 0,
    })
    const { squares } = this.getCurrentData()
    this.setWinnerIndex(calculateWinner(squares))
  }

  setWinnerIndex(winner) {
    let winnerIndex = []
    if (winner) {
      winnerIndex = winner.index.slice()
    }
    this.setState({
      winnerIndex,
    })
  }

  toggleMoves() {
    const history = this.state.history.slice().reverse()
    this.setState({
      isAsc: !this.state.isAsc,
      history,
      stepNumber: history.length - this.state.stepNumber - 1,
    })
  }

  render() {
    const history = this.state.history.slice()
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    const moves = history.map((item, index) => {
      const filter = item.squares.filter((items) => items === null)
      const desc =
        filter.length < item.squares.length
          ? `Go to move #${item.index}-(${item.x}, ${item.y})`
          : `Game Start`
      return (
        <li key={index}>
          <button
            className={index === this.state.stepNumber ? 'active' : ''}
            onClick={() => {
              this.jumpTo(index)
            }}
          >
            {desc}
          </button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner: ${winner.role}`
    } else {
      if (!current.squares.includes(null)) {
        status = 'Game Over'
      } else {
        status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {
              this.handleClick(i)
            }}
            activeIndex={this.state.winnerIndex}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button
            onClick={() => {
              this.toggleMoves()
            }}
          >
            {this.state.isAsc ? '升序' : '降序'}
          </button>
        </div>
      </div>
    )
  }
}

export default Game
