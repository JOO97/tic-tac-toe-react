import React from 'react'
import { searchResult } from '../api/search'
import Loader from './Loader'
import Gallery from './Gallery'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
    }
  }
  componentDidMount() {
    this.getSearchResult()
  }
  async getSearchResult() {
    const { searchTerm } = this.props
    const { data } = await searchResult(searchTerm)
    this.setState({
      data: data.photos.photo,
      loading: false,
    })
  }
  render() {
    return (
      <div>
        <h2>{this.props.searchTerm} Images</h2>
        <div className="photo-container">
          {this.state.loading ? <Loader /> : <Gallery data={this.state.data} />}
        </div>
      </div>
    )
  }
}

export default Search
