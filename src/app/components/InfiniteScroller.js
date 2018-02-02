import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroller extends React.Component {
  constructor (props) {
    super()
    this.wrapper = null
  }

  handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target
    const isAtTheBottom = scrollTop + clientHeight >= scrollHeight - this.props.buffer

    if (isAtTheBottom && this.props.onScrollAtTheBottom) {
      this.props.onScrollAtTheBottom()
    }
  };

  componentDidMount () {
    if (this.thereIsNoScroll()) {
      this.props.onScrollAtTheBottom()
    }
  }

  thereIsNoScroll = () =>
    this.wrapper && this.wrapper.clientHeight > this.wrapper.children[0].clientHeight;

  render () {
    const { buffer, style, onScrollAtTheBottom, children, className } = this.props
    if (this.thereIsNoScroll()) {
      // console.log('onScrollAtTheBottom')
      onScrollAtTheBottom()
    }

    return (
      <div
        ref={(node) => {
          this.wrapper = node
        }}
        style={{ flex: 1, overflowY: 'auto', height: '100%', ...style }}
        className={className}
        onScroll={this.handleScroll}
      >
        <div>
          {children}
        </div>
      </div>
    )
  }
}

InfiniteScroller.propTypes = {
  buffer: PropTypes.number.isRequired,
  onScrollAtTheBottom: PropTypes.func
}

InfiniteScroller.defaultProps = {
  buffer: 300
}

export default InfiniteScroller
