import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { graphql } from 'react-apollo'

import NotFound from './pages/NotFound'
import Auth from '../../auth/components/AuthContainer'
import AdminPanel from './layout/AdminPanel'

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" render={() => <Auth plugin={this.props.plugin} />} />
        <Route path="/admin" component={AdminPanel} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: {}// state.session.user
})

export default connect(mapStateToProps)(App)
