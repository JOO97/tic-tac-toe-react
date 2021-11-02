import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// class Square extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//   }
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => {
//           this.props.onClick()
//         }}
//       >
//         {this.props.value}
//       </button>
//     )
//   }
// }

function Square(props) {
  return (
    <button
      className={props.active ? 'square line' : 'square'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

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

  handleClick(i) {
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
    console.log('h', history)
    const current = history[isAsc ? history.length - 1 : 0]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    const x = Math.ceil((i + 1) / 3)
    const y = !((i + 1) % 3) ? 3 : (i + 1) % 3
    this.setState({
      history: isAsc
        ? history.concat([
            {
              squares,
              x,
              y,
            },
          ])
        : [
            {
              squares,
              x,
              y,
            },
          ].concat(history),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
    const winner = calculateWinner(squares)
    if (winner) {
      this.setWinnerIndex(winner)
    }
  }

  jumpTo(index) {
    this.setState({
      stepNumber: index,
      xIsNext: index % 2 === 0,
    })
  }

  setWinnerIndex({ index }) {
    const winnerIndex = index.slice()
    this.setState({
      winnerIndex,
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
          ? `Go to move #${index}-(${item.x}, ${item.y})`
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
              const history = this.state.history.slice().reverse()
              this.setState({
                isAsc: !this.state.isAsc,
                history,
              })
            }}
          >
            {/* TODO */}
            {/* {this.state.isAsc ? '升序' : '降序'}- {this.state.isAsc + ''} */}
          </button>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))

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
