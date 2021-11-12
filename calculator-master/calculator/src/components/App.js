import React from 'react'
import './App.css'

import Display from './Display'
import ButtonPanel from './ButtonPanel'

import calculate from '../logic/calculate'

export default class App extends React.Component {
  state = {
    result: null,
    next: null,
    operation: null,
  }

  handleClick = (btnName) => {
    this.setState(calculate(this.state, btnName))
  }

  render() {
    return (
      <div className="component-app">
        <div>
          result:{this.state.result}-next:{this.state.next}- operation:
          {this.state.operation}
        </div>
        <Display value={this.state.next || this.state.result || '0'} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    )
  }
}
