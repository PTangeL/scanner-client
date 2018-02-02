import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
// import { Width, LARGE } from '../package/Width'
import { Width, LARGE } from 'react-width'

const NewFloatingButton = ({ onClick }) => (
  <Width>
    {(width) => {
      const styles = { position: 'fixed', top: '12px', right: '15px', zIndex: '999999' }
      let mini = true
      if (width === LARGE) {
        styles.top = '35px'
        mini = false
      }

      return (
        <FloatingActionButton onClick={onClick} secondary mini={mini} style={styles}>
          <ContentAdd />
        </FloatingActionButton>
      )
    }}
  </Width>
)

export default NewFloatingButton
