import React from 'react'
import PropTypes from 'prop-types'

const withContext = (contextTypes = {}) => {
  const contextTypeKeys = Object.keys(contextTypes)

  return (Component) => {
    const WithContext = (props, context) => {
      const mapContextToProps = contextTypeKeys.reduce(
        (acc, key) => {
          acc[key] = context[key]
          return acc
        },
        {}
      )

      return <Component {...props} {...mapContextToProps} />
    }

    WithContext.contextTypes = contextTypes

    return WithContext
  }
}

export default withContext
