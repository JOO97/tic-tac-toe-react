import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/Header'
import Search from './components/Search'
import NotFound from './components/NotFound'

class App extends React.Component {
  handleSubmit = (e, keyword, history) => {
    e.preventDefault()
    e.currentTarget.reset()
    history.push(`/search/${keyword}`)
  }

  render() {
    return (
      <HashRouter basename="/SnapScout">
        <div className="container">
          <Route
            render={(props) => (
              <Header
                history={props.history}
                handleSubmit={this.handleSubmit}
              />
            )}
          ></Route>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/search/mountain" />}
            />
            <Route
              path="/search/:searchInput"
              render={(props) => (
                <Search searchTerm={props.match.params.searchInput} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
