import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import {
  renderTextField,
  renderSelectField
} from '../../app/components/form/Field'

const LoginForm = (
  { handleSubmit, pristine, reset, submitting, onSubmit }
) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field name="email" component={renderTextField} label="Email" />
    <Field name="password" type="password" component={renderTextField} label="Password" />
    <div>
      <RaisedButton type="submit" label="Submit" disabled={pristine || submitting} primary />
    </div>
  </form>
)

LoginForm.propTypes = {
  ...propTypes
}

const withReduxForm = reduxForm({
  form: 'LoginForm',
  enableReinitialize: true
})

export default withReduxForm(LoginForm)
