import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createBatchingNetworkInterface } from 'react-apollo'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Raven from 'raven-js'

import configureStore from './app/store'
import { SENTRY_DSN, API_BASE_URL } from './app/config'
import './index.css';
import Root from './app/components/Root';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin()

Raven.config(SENTRY_DSN).install()

const plugin = document.getElementById('plugin0');

const networkInterface = createBatchingNetworkInterface({
  uri: `${API_BASE_URL}/graphql`,
  batchInterval: 10,
  opts: {
    credentials: 'include'
  }
})

const client = new ApolloClient({
  networkInterface
})

const store = configureStore(client)

ReactDOM.render(
  <Root store={store} plugin={plugin} client={client}/>,
  document.getElementById('root')
)

//registerServiceWorker()
