import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {
  User,
  Amount,
  setUserData,
  getUserData,
  renderUserBlock,
  getFavoritesAmount,
} from './user.js'

setUserData('Galand','https://picsum.photos/200', 7)
const user: User = getUserData('user')
const favoritesAmount: Amount = getFavoritesAmount('favoritesAmount')

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(user.username, user.avatarUrl, favoritesAmount.amount)
  renderSearchFormBlock()
  renderSearchStubBlock()
})
