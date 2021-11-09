import React from 'react'

const Square = (props) => {
  return (
    <button
      className={props.active ? 'square line' : 'square'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

export default Square
