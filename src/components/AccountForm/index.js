import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Button, FormFeedback } from 'reactstrap'
import { validate } from './validation'

const AccountForm = props => {
  const { onUpdateAccount, action } = props
  const [data, setData] = useState(props.data || {})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    const { isValid, errors } = validate(data, action)

    if (!isValid) {
      return setErrors(errors)
    }

    onUpdateAccount(data)
    setData({})
    setErrors({})
  }

  return <Form>
    <FormGroup>
      <Input
        name="name"
        type="text"
        placeholder="Name"
        value={ data?.name || ''}
        onChange={ onChange }
        invalid={ !!errors.name }
      />
      {!!errors.name && <FormFeedback>{ errors.name }</FormFeedback>}
    </FormGroup>
    <FormGroup>
      <Input
        name="walletAddress"
        type="text"
        placeholder="Wallet Address"
        value={ data?.walletAddress || '' }
        onChange={ onChange }
        invalid={ !!errors.walletAddress }
      />
      {!!errors.walletAddress && <FormFeedback>{ errors.walletAddress }</FormFeedback>}
    </FormGroup>
    <FormGroup>
      <Input
        name="email"
        type="text"
        placeholder="Email"
        value={ data?.email || '' }
        onChange={ onChange }
        invalid={ !!errors.email }
      />
      {!!errors.email && <FormFeedback>{ errors.email }</FormFeedback>}
    </FormGroup>
    <FormGroup>
      <Button type="button" onClick={ onSubmit } color={ action === 'update' ? 'primary' : 'success' }>
        { action === 'add' ? 'Add account' : 'Update account' }
      </Button>
    </FormGroup>
  </Form>
}

export default AccountForm