import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import { pinkA200 } from 'material-ui/styles/colors'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Width, LARGE } from 'react-width'
import { fetchMoreParams } from '../../../app/utils/apolloUtils'
import { usersQueryVariables } from '../../queries'
import throttle from '../../../app/utils/throttle'
import InfiniteScroller from '../../../app/components/InfiniteScroller'
import USERS_QUERY from '../../graphql/Users.graphql'
import NewFloatingButton from '../../../app/components/navigations/NewFloatingButton'
import NewUser from './NewUser'
import EditUser from './EditUser'
import View from '../../../app/components/layout/View'

const UserList = ({ history, match, ...props }) => {
  const showUserDetail = ({ id }) => {
    history.push(`${match.url}/${id}`)
  }

  const { loading, error, users = {} } = props.data
  let master

  if (loading) {
    master = <p>Loading ...</p>
  } else if (error) {
    master = <p>{error.message}</p>
  } else {
    const userEdges = users.edges || []
    const listItems = userEdges.map(({ node }, index) => (
      <ListItem
        onClick={() => showUserDetail(node)}
        key={node.id}
        style={{ color: 'black' }}
        primaryText={node.title}
        secondaryText={
          `${node.code} - ${node.type} | ${new Date(node.start_date).toLocaleString()}`
        }
        leftIcon={<ActionGrade color={pinkA200} />}
      />
    ))

    master = (
      <InfiniteScroller
        className="view"
        onScrollAtTheBottom={() => {
          if (users.pageInfo.hasNextPage && !loading) {
            props.loadMoreEntries()
          }
        }}
      >
        <List>
          {listItems}
          <NewFloatingButton onClick={() => history.push(`${match.url}/new`)} />
        </List>
      </InfiniteScroller>
    )
  }

  return (
    <Width>
      {width => (
        <View style={{ display: 'flex' }}>
          <Route
            exact={width < LARGE}
            path={`${match.url}`}
            render={() => <View children={master} />}
          />
          <Switch>
            <Route path={`${match.url}/new`} render={() => <View component={NewUser} />} />
            <Route path={`${match.url}/:id`} render={() => <View component={EditUser} />} />
            <Route exact path={width < LARGE ? `/` : null} component={View} />
          </Switch>
        </View>
      )}
    </Width>
  )
}

UserList.propTypes = {
  data: PropTypes.object.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

UserList.defaultProps = {
  data: {}
}

const fetchUsers = graphql(USERS_QUERY, {
  options: () => ({ ...usersQueryVariables }),
  props ({ data }) {
    const { users, fetchMore } = data

    return {
      data,
      loadMoreEntries: throttle(() =>
        fetchMore(
          fetchMoreParams({
            query: USERS_QUERY,
            name: 'users',
            data: users
          })
        ))
    }
  }
})

export default compose(withRouter, fetchUsers)(UserList)
