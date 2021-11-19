import React, { PureComponent } from 'react'

class SearchBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: props.history.location.pathname.split('/')[2] || '',
    }
  }
  componentDidMount() {
    this.props.history.listen(() => {
      this.setState({
        keyword: this.props.history.location.pathname.split('/')[2] || '',
      })
    })
  }
  handleKeywordChange(e) {
    this.setState({
      keyword: e.target.value,
    })
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={(e) => {
          this.props.handleSubmit(e, this.state.keyword, this.props.history)
        }}
      >
        <input
          type="text"
          placeholder="search..."
          value={this.state.keyword}
          onChange={(e) => {
            this.handleKeywordChange(e)
          }}
        />
        <button
          type="submit"
          className={`search-button ${
            this.state.keyword.trim() ? 'active' : null
          }`}
          disabled={!this.state.keyword.trim()}
        >
          <svg height="32" width="32">
            <path
              d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
              fill="#ffffff"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </form>
    )
  }
}

export default SearchBar
