import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { Card, CardText } from 'material-ui/Card'
import { withRouter } from 'react-router'

import UserForm from './UserForm'
import CREATE_USER from '../../graphql/CreateUser.graphql'
import USERS_QUERY from '../../graphql/Users.graphql'
import { getErrorMessages } from '../../../app/utils/graphQL'
import withNotifier from '../../../app/components/notification/withNotifier'

const NewUser = ({ mutate, notifier, history, match }) => {
  const save = (variables) => {
    mutate({ variables })
      .then(({ data }) => {
        history.push(match.url.replace('/new', ''))
        notifier.open({ message: 'The user has been created' })
      })
      .catch((error) => {
        // TODO: send to sentry
        const errorMessages = getErrorMessages(error)
        errorMessages.map((message) => {
          notifier.open({ message })
        })
      })
  }

  return (
    <Card>
      <CardText>
        <UserForm onSubmit={save} />
      </CardText>
    </Card>
  )
}

NewUser.propTypes = {
  mutate: PropTypes.func.isRequired
}

const createUser = graphql(CREATE_USER, {
  options: {
    refetchQueries: [{ query: USERS_QUERY }]
  }
})

export default compose(withRouter, withNotifier, createUser)(NewUser)
