/* eslint react/prop-types: 0 */
/* eslint react/no-children-prop: 0 */

import React from 'react'
import TextField from 'material-ui/TextField'
import { RadioButtonGroup } from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'

export const datify = (input) => {
  if (!input) {
    return null
  }

  const date = input instanceof Date ? input : new Date(input)
  if (isNaN(date)) {
    throw new Error(`Invalid date: ${input}`)
  }

  return date
}

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    style={{ width: '100%' }}
    {...input}
    {...custom}
  />
)

export const renderMultiLineTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    style={{ width: '100%' }}
    {...input}
    {...custom}
    multiLine
    rows={2}
  />
)

export const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={!!input.value}
    onCheck={input.onChange}
    style={{ width: '100%' }}
  />
)

export const renderDatePickerField = ({ input, label, meta: { touched, error } }) => (
  <DatePicker
    floatingLabelText={label}
    errorText={touched && error}
    textFieldStyle={{ width: '100%' }}
    value={datify(input.value)}
    onChange={(_, value) => {
      input.onChange(value)
    }}
  />
)

export const renderTimePickerField = ({ input, label, meta: { touched, error } }) => (
  <TimePicker
    floatingLabelText={label}
    errorText={touched && error}
    textFieldStyle={{ width: '100%' }}
    value={datify(input.value)}
    onChange={(_, value) => {
      input.onChange(value)
    }}
  />
)

export const renderRadioGroup = ({ input, meta: { touched, error }, ...rest }) => (
  <div>
    <RadioButtonGroup
      {...input}
      {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
      style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#fafafa' }}
    />
    {touched &&
      (error &&
        <span
          style={{
            fontWeight: 700,
            color: '#700'
          }}
        >
          {error}
        </span>)}
  </div>
)

export const renderSelectField = (
  { input, label, meta: { touched, error }, children, ...custom }
) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    style={{ width: '100%' }}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)
