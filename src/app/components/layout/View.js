import React from 'react'

const View = props => (
  <div style={{ flex: 1, overflowY: 'auto', ...props.style }}>
    {props.component ? React.createElement(props.component) : props.children}
  </div>
)

export default View
