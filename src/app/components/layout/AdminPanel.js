import React, { Component } from 'react'
import { cyan500 } from 'material-ui/styles/colors'
import { spacing, typography } from 'material-ui/styles'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Route, Switch } from 'react-router-dom'
import withWidth, { MEDIUM } from './Width'

import theme from '../../config/theme'

import Dashboard from '../pages/Dashboard'
import NavDrawer from '../navigations/NavDrawer'
//import UserList from '../../user/components/admin/UserList'

const muiTheme = getMuiTheme(theme)

export class AdminPanel extends Component {
  static getStyles () {
    const styles = {
      appBar: {
        position: 'fixed',
        zIndex: muiTheme.zIndex.appBar + 1,
        top: 0
      },
      root: {},
      nav: {
        color: typography.textFullWhite
      },
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan500,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8
      }
    }

    return styles
  }

  state = {
    nav: { open: false }
  };

  toggleNav = () => {
    if (this.props.width < MEDIUM) {
      this.setState({ nav: { open: !this.state.nav.open } })
    }
  };

  closeNav = () => {
    this.setState({ nav: { open: false } })
  };

  render () {
    let docked = false
    const styles = AdminPanel.getStyles()
    const { match, width } = this.props

    let navDrawerOpen = this.state.nav.open
    if (width >= MEDIUM) {
      docked = true
      navDrawerOpen = true
      styles.root.paddingLeft = 256
    } else {
      styles.root.paddingLeft = 0
    }

    return (
      <div className="main-view" style={{ ...styles.root }}>
        <AppBar
          title={width >= MEDIUM ? '' : 'Fingopay'}
          onLeftIconButtonTouchTap={() => this.toggleNav()}
          showMenuIconButton={width < MEDIUM}
          className="app-bar"
        />
        <NavDrawer
          open={navDrawerOpen}
          toggleNav={() => this.toggleNav()}
          closeNav={this.closeNav}
          styles={styles}
          docked={docked}
        />
        <Switch>
          <Route exact path={`${match.url}/`} component={Dashboard} />
          {/* <Route path={`${match.url}/users`} component={UserList} /> */}
        </Switch>
      </div>
    )
  }
}

export default withWidth(AdminPanel)
