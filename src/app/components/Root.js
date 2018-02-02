import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import Dialog from './notification/Dialog'
import theme from '../config/theme'
import App from './App';

const muiTheme = getMuiTheme(theme)

const Root = ({ plugin, client, store }) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Dialog>
          <Router>
            <App plugin={plugin} />
          </Router>
        </Dialog>
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>
)

export default Root
