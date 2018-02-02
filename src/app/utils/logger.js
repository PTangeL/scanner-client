import PropTypes from 'prop-types'

import withContext from '../components/package/withContext'

export const withLogger = withContext({ logger: PropTypes.object })

export const DEBUG = 'debug'
export const INFO = 'info'
export const WARNING = 'warning'
export const ERROR = 'error'
export const FATAL = 'fatal'

const createLogger = ({ raven }) => ({
  debug: (message) => {
    raven.captureMessage(message, { level: DEBUG })
  },
  info: (message) => {
    raven.captureMessage(message, { level: INFO })
  },
  warning: (message) => {
    raven.captureMessage(message, { level: WARNING })
  },
  error: (message) => {
    raven.captureMessage(message, { level: ERROR })
  },
  fatal: (message) => {
    raven.captureMessage(message, { level: FATAL })
  }
})

export default createLogger
