/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { withRouter } from 'react-router'
import Redeem from 'material-ui/svg-icons/action/redeem'
import School from 'material-ui/svg-icons/social/school'
import Public from 'material-ui/svg-icons/social/public'
import Person from 'material-ui/svg-icons/social/person'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

export const NavDrawer = ({ history, toggleNav, open, styles, logout, docked }) => {
  const menuItemClicked = (path) => {
    history.push(path)
    toggleNav()
  }

  return (
    <Drawer open={open} docked={docked} onRequestChange={toggleNav}>
      <ListItem onClick={() => menuItemClicked('/admin/users')} leftIcon={<Person />}>
        Users
      </ListItem>
      <Divider />
      {/*<ListItem onClick={logout} leftIcon={<ExitToApp />}>Logout</ListItem>*/}
    </Drawer>
  )
}

NavDrawer.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
}

export default withRouter(NavDrawer)
