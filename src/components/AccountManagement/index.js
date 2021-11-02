import React, { useState, useEffect } from 'react'
import { Row, Col, Card, CardBody, CardText } from 'reactstrap'
import { ACCOUNTS_KEY, getAccountsFromLocalStorage } from '../../utils/common'
import AccountForm from '../AccountForm'
import AccountCard from '../AccountCard'
import './index.scss'


const AccountManagement = () => {
  const [accounts, setAccounts] = useState([])
  const [currentAccount, setCurrentAccount] = useState(null)

  useEffect(() => {
    const initialAccounts = getAccountsFromLocalStorage()
    setAccounts(initialAccounts)
  }, [])

  const addOrUpdateAccount = account => {
    const updatedAccounts = [ ...accounts ]

    if (!currentAccount) {
      // Add new account
      updatedAccounts.push(account)
    } else {
      // Update account
      updatedAccounts[currentAccount.index] = account
    }

    setAccounts(updatedAccounts)
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts))
    setCurrentAccount(null)
  }

  const removeAccount = idx => {
    let updatedAccounts = [ ...accounts ]
    updatedAccounts.splice(idx, 1)
    setAccounts(updatedAccounts)
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts))
  }

  return (
    <Row className="account-management">
      <Col className="sticky" sm="12" md="5">
        <h2>Form</h2>
        <AccountForm 
          onUpdateAccount={ addOrUpdateAccount }
          data={ currentAccount }
          action={ currentAccount ? 'update' : 'add' }
        />
      </Col>
      <Col className="sticky" sm="12" md="7">
        <h2>Friends</h2>
        {!accounts.length ? 
          <Card>
            <CardBody>
              <CardText>
                <i>There is no friend card!</i>
              </CardText>
            </CardBody>
          </Card> :
          <div className="accounts">
            {accounts.map((account, idx) =>
              <AccountCard
                key={ idx }
                index={ idx }
                { ...account }
                onProposeToUpdate={ account => setCurrentAccount(account) }
                onRemove={ removeAccount }
              />
            )}
          </div>
        }
      </Col>
    </Row>
  );
}

export default AccountManagement
