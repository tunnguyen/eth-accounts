import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardText, Button } from 'reactstrap'
import './index.scss'

const AccountCard = props => {
  const { index, name, walletAddress, email, onProposeToUpdate, onRemove } = props
  const [isInitial, setInitial] = useState(false)

  useEffect(() => {
    setInitial(true)
    setTimeout(() => setInitial(false), 1000)
  }, [name, walletAddress, email])

  return <Card className="account-card" color={ isInitial ? 'success' : '' } inverse={ !!isInitial }>
    <CardBody>
      <i className="account-card__order">{ index + 1 }</i>
      <CardText>
        <span>Name: </span><strong>{ name }</strong>
      </CardText>
      <CardText>
        <span>Wallet: </span><strong>{ walletAddress }</strong>
      </CardText>
      <CardText>
        <span>Email: </span><strong>{ email }</strong>
      </CardText>
    </CardBody>
    <CardBody className="account-card__buttons">
      <Button color="primary" onClick={ () => onProposeToUpdate({ index, name, walletAddress, email }) }>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </Button>
      <Button color="danger" onClick={ () => onRemove(index) }>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </Button>
    </CardBody>
  </Card>
}

export default AccountCard