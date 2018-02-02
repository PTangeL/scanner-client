import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

class Notifier extends React.Component {
  constructor () {
    super()
    this.state = {
      open: false,
      message: '',
      autoHideDuration: 4000
    }
  }

  open = ({ message }) => {
    this.setState({
      open: true,
      message
    })
  };

  close = () => {
    this.setState({
      open: false
    })
  };

  getChildContext () {
    return {
      notifier: {
        open: this.open,
        close: this.close
      }
    }
  }

  /* TODO Remove the first <div> when Fiber is released */
  render () {
    return (
      <div style={{ minHeight: '100%' }}>
        {this.props.children}
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.close}
          bodyStyle={{ height: 'auto', lineHeight: '24px', padding: 24, whiteSpace: 'pre-line' }}
        />
      </div>
    )
  }
}

Notifier.childContextTypes = {
  notifier: PropTypes.object
}

export default Notifier
