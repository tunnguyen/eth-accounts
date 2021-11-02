import Web3 from 'web3'
import { getAccountsFromLocalStorage } from '../../utils/common'

const isEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validate = (data, action) => {
  const { name, email, walletAddress } = data || {}
  const errors = {}

  if (!name || !name.length) {
    errors.name = 'Name is required!'
  }

  if (!email || !email.length) {
    errors.email = 'Email is required!'
  }

  if (!isEmail(email)) {
    errors.email = 'Email is invalid!'
  }

  if (!walletAddress || !walletAddress.length) {
    errors.walletAddress = 'Wallet address is required!'
  }

  if (!Web3.utils.isAddress(walletAddress)) {
    errors.walletAddress = 'Wallet address is invalid!'
  }

  if (action === 'add') {
    const accounts = getAccountsFromLocalStorage()

    if (accounts.findIndex(account => account.email === email) > -1) {
      errors.email = 'Email is already existing!'
    }

    if (accounts.findIndex(account => account.walletAddress === walletAddress) > -1) {
      errors.walletAddress = 'Wallet address is already existing!'
    }
  }

  return {
    isValid: !Object.keys(errors).length,
    errors
  }
}
