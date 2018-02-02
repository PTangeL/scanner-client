import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { graphql, compose } from 'react-apollo'
import { Card, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router'

import withWidth, { LARGE } from '../../../app/components/layout/Width'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import { formatTime } from 'material-ui/TimePicker/timeUtils'

import mapDataToProps from '../../../app/utils/apolloUtils'
import UserForm from './UserForm'
import USERS_QUERY from '../../graphql/Users.graphql'
import USER_QUERY from '../../graphql/User.graphql'
import USER_DELETE from '../../graphql/DeleteUser.graphql'
import USER_UPDATE from '../../graphql/UpdateUser.graphql'
import withDialog from '../../../app/components/notification/withDialog'
import withNotifier from '../../../app/components/notification/withNotifier'
import { getErrorMessages } from '../../../app/utils/graphQL'

const EditUser = (props) => {
  const { loading, error } = props.data

  const save = (variables) => {
    props
      .mutate({ variables })
      .then(({ data }) => {
        if (props.width <= LARGE) {
          // replace(/\/[^/]*$/,'') removes the last path, ex. /59120be65392f9ff4ef84cf9 from the url
          props.history.push(props.match.url.replace(/\/[^/]*$/, ''))
        }
        props.notifier.open({ message: 'The user has been saved' })
      })
      .catch((err) => {
        // TODO: send to sentry
        const errorMessages = getErrorMessages(err)
        errorMessages.map((message) => {
          props.notifier.open({ message })
        })
      })
  }

  const deleteUser = (variables) => {
    props
      .deleteUser()
      .then(({ data }) => {
        if (data.deleteUser.status === 'ok') {
          // replace(/\/[^/]*$/,'') removes the last path, ex. /59120be65392f9ff4ef84cf9 from the url
          props.history.push(props.match.url.replace(/\/[^/]*$/, ''))
          props.notifier.open({ message: 'The user has been removed' })
          props.dialog.close()
        } else {
          props.notifier.open({ message: 'We could not remove the user' })
        }
      })
      .catch((err) => {
        props.notifier.open({ message: 'We could not remove the user' })
      })
  }

  let content = null
  if (loading) {
    content = <p>Loading ...</p>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    const user = props.data.user || {}
    content = (
      <UserForm
        deleteUser={() =>
          props.dialog.open({
            title: 'Watch out!',
            message: 'Are you sure you want to remove this user',
            actions: [
              <FlatButton
                label="Remove"
                primary={false}
                icon={<DeleteForever />}
                onTouchTap={deleteUser}
              />,
              <FlatButton label="Cancel" primary keyboardFocused onTouchTap={props.dialog.close} />
            ]
          })}
        onSubmit={save}
        initialValues={props.initialValues}
      />
    )
  }

  return (
    <Card>
      <CardText>
        {content}
      </CardText>
    </Card>
  )
}

EditUser.propTypes = {
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
}

EditUser.defaultProps = {
  data: {}
}

const fetchUser = graphql(USER_QUERY, {
  options: ({ match: { params: { id } } }) => ({ variables: { id } }),
  props: mapDataToProps('user', 'initialValues')
})

const deleteUser = graphql(USER_DELETE, {
  options: ({ match: { params: { id } } }) => ({
    variables: { id },
    update: (proxy, { data: { deleteUser } }) => {
      const query = { query: USERS_QUERY }

      // Read the data from our cache for this query.
      const data = proxy.readQuery(query)

      // Add our comment from the mutation to the end.
      data.users.edges = data.users.edges.filter(({ node, cursor }) => node.id !== id)

      // Write our data back to the cache.
      proxy.writeQuery({ ...query, data })
    }
  }),
  name: 'deleteUser'
})

const updateUser = graphql(USER_UPDATE, {
  options: {
    refetchQueries: [{ query: USERS_QUERY }]
  }
})

export default compose(
  withNotifier,
  withRouter,
  withDialog,
  withWidth,
  updateUser,
  deleteUser,
  fetchUser
)(EditUser)
