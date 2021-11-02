export const ACCOUNTS_KEY = 'accounts'

export const getAccountsFromLocalStorage = () => JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY)) || []