import React from 'react'
import PropTypes from 'prop-types'
import './ButtonPanel.css'

import Button from './Button'

const btnList = [
  [
    {
      name: 'AC',
      orange: false,
      wide: false,
    },
    {
      name: '+/-',
      orange: false,
      wide: false,
    },
    {
      name: '%',
      orange: false,
      wide: false,
    },
    {
      name: '÷',
      orange: true,
      wide: false,
    },
  ],
  [
    {
      name: '7',
      orange: false,
      wide: false,
    },
    {
      name: '8',
      orange: false,
      wide: false,
    },
    {
      name: '9',
      orange: false,
      wide: false,
    },
    {
      name: 'x',
      orange: true,
      wide: false,
    },
  ],
  [
    {
      name: '4',
      orange: false,
      wide: false,
    },
    {
      name: '5',
      orange: false,
      wide: false,
    },
    {
      name: '6',
      orange: false,
      wide: false,
    },
    {
      name: '-',
      orange: true,
      wide: false,
    },
  ],
  [
    {
      name: '1',
      orange: false,
      wide: false,
    },
    {
      name: '2',
      orange: false,
      wide: false,
    },
    {
      name: '3',
      orange: false,
      wide: false,
    },
    {
      name: '+',
      orange: true,
      wide: false,
    },
  ],
  [
    {
      name: '0',
      orange: false,
      wide: true,
    },
    {
      name: '.',
      orange: false,
      wide: false,
    },
    {
      name: '=',
      orange: true,
      wide: false,
    },
  ],
]

export default class ButtonPanel extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  }

  handleClick = (btnName) => {
    this.props.clickHandler(btnName)
  }

  render() {
    return (
      <div className="component-button-panel">
        {btnList.map((item, index) => {
          return (
            <div key={index}>
              {item.map((items) => {
                return (
                  <Button
                    name={items.name}
                    clickHandler={this.handleClick}
                    orange={items.orange}
                    wide={items.wide}
                    key={items.name}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
