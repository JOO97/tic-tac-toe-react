import React from 'react'

import Header from './components/Header'
import InputItem from './components/InputItem'
import List from './components/List'

import emojiList from './static/emojiList.json'

function filter(value, len) {
  return emojiList
    .filter((item) => {
      if (item.title.toLowerCase().includes(value.toLowerCase())) return true
      if (item.keywords.toLowerCase().includes(value.toLowerCase())) return true
      return false
    })
    .slice(0, len)
}

class App extends React.Component {
  state = {
    currentEmojiList: filter('', 20),
  }

  handleValueChange = (e) => {
    this.setState({
      currentEmojiList: filter(e.target.value, 20),
    })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <InputItem valueChange={this.handleValueChange} />
        <List listData={this.state.currentEmojiList} />
      </div>
    )
  }
}

export default App
