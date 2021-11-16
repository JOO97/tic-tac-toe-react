import React from 'react'
import PropTypes from 'prop-types'

import Clipboard from 'clipboard'

import ListRow from '../ListRow'

class List extends React.Component {
  static propTypes = {
    listData: PropTypes.array,
  }

  componentDidMount() {
    this.clipboard = new Clipboard('.listRow')
    this.clipboard.on('success', function (e) {
      alert(`复制${e.text}成功!`)
      e.clearSelection()
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  render() {
    return (
      <div className="component-emoji-results">
        {this.props.listData.map((item, index) => {
          return <ListRow title={item.title} key={index} symbol={item.symbol} />
        })}
      </div>
    )
  }
}

export default List
