import axios from 'axios'

const apiKey = '636e1481b4f3c446d26b8eb6ebfe7127'

export function searchResult(query) {
  return axios.get(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
  )
}
