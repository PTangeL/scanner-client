import { EXTRA_LARGE, LARGE, MEDIUM, SMALL, EXTRA_SMALL } from 'react-width'
const withReactWidth = require('react-width').default

export { EXTRA_LARGE, LARGE, MEDIUM, SMALL, EXTRA_SMALL }

const withWidth = Component =>
  withReactWidth()(Component)

export default withWidth
