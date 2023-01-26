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
import {getTodosByCount} from "./todo.js";


const url: string = 'https://jsonplaceholder.typicode.com/todos?_limit='
const count: number = 10
getTodosByCount(url, count)
  .then((todos) => {
    console.log(todos)
  }).catch((error) => {
  console.error('Fetch Error :-S', error)
})

setUserData('Galand', 'https://picsum.photos/200', 7)
const user: User = getUserData('user')
const favoritesAmount: Amount = getFavoritesAmount('favoritesAmount')

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(user.username, user.avatarUrl, favoritesAmount.amount)
  renderSearchFormBlock()
  renderSearchStubBlock()
})
