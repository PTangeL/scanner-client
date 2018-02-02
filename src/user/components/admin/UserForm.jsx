import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete'

import {
  renderTextField,
  renderDatePickerField,
  renderSelectField
} from '../../app/components/form/Field'

const UserForm = (
  { handleSubmit, pristine, reset, submitting, onSubmit, deleteUser, initialValues }
) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field name="email" component={renderTextField} label="Email" />
    <Field name="first_name" component={renderTextField} label="First name" />
    <Field name="last_name" component={renderTextField} label="Last name" />
    <Field name="password" type="password" component={renderTextField} label="Password" />
    <Field name="repeat_password" type="password" component={renderTextField} label="Repeat password" />
    <Field name="date_of_birth" component={renderDatePickerField} label="Date of birth" />
    <div>
      <RaisedButton type="submit" label="Submit" disabled={pristine || submitting} primary />
      {initialValues ? <RaisedButton label="Clear Values" onClick={reset} /> : ''}
      {deleteUser
        ? <RaisedButton
          style={{ float: 'right' }}
          label="Remove"
          icon={<Delete />}
          onClick={deleteUser}
        />
        : ''}
    </div>
  </form>
)

UserForm.propTypes = {
  ...propTypes,
  deleteUser: PropTypes.func
}

UserForm.defaultProps = {
  deleteUser: null
}

const withReduxForm = reduxForm({
  form: 'UserForm',
  enableReinitialize: true
})

export default withReduxForm(UserForm)
