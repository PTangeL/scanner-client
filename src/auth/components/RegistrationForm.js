import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import {
  renderTextField,
  renderDatePickerField,
  renderSelectField
} from '../../app/components/form/Field'

class RegistrationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      enrolmentTemplate: null
    }
  }

  render() {
    const {
      handleSubmit, pristine, reset, submitting, onSubmit, change, getEnrolmentTemplate
    } = this.props
    const { enrolmentTemplate } = this.state

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="email" component={renderTextField} label="Email" />
        <Field name="first_name" component={renderTextField} label="First name" />
        <Field name="last_name" component={renderTextField} label="Last name" />
        <Field name="password" type="password" component={renderTextField} label="Password" />
        <Field name="repeat_password" type="password" component={renderTextField} label="Repeat password" />
        <Field name="date_of_birth" component={renderDatePickerField} label="Date of birth" />
        <div>
          <RaisedButton
            type="submit"
            label="Submit"
            disabled={!enrolmentTemplate || pristine || submitting}
            primary
          />
          <RaisedButton
            label="Enrole template"
            onClick={() =>{
              getEnrolmentTemplate().then( enrolmentTemplate => {
                this.setState({ enrolmentTemplate })
                change('template', enrolmentTemplate)
              })
            }}
            disabled={enrolmentTemplate}
          />
        </div>
      </form>
    )
  }
}

RegistrationForm.propTypes = {
  ...propTypes
}

const withReduxForm = reduxForm({
  form: 'RegistrationForm',
  enableReinitialize: true
})

export default withReduxForm(RegistrationForm)
