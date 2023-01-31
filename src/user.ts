import {renderBlock} from './lib.js'

export function setUserData(
  username: string,
  avatarUrl: string,
  favoritesAmount: number
): void {
  localStorage.setItem('user', JSON.stringify({ username: username, avatarUrl: avatarUrl }))
  localStorage.setItem('favoritesAmount', JSON.stringify({amount: favoritesAmount}))
}

export interface User {
  username: string,
  avatarUrl: string
}

export interface Amount {
  amount: number
}

const isUser = (object: unknown): object is User => {
  return (
    typeof (object as User).username === 'string' &&
    typeof (object as User).avatarUrl === 'string'
  )
}

export function getUserData(key: string): User | undefined {
  const item = localStorage.getItem(key)
  let userData: unknown
  if (item) {
    userData = JSON.parse(item)
  }
  if (isUser(userData)) return userData
  return undefined
}

export function getFavoritesAmount(key: string): Amount {
  const item = localStorage.getItem(key)
  let favoritesAmount: unknown
  if (item) {
    favoritesAmount = JSON.parse(item)
  }

  if (typeof favoritesAmount === 'object' && favoritesAmount != null && 'amount' in favoritesAmount) {
    return favoritesAmount as Amount
  }
  throw new Error('Всё пропало! Звоните админу!');
}

export function renderUserBlock(userName: string,
                                avatarUrl: string,
                                favoriteItemsAmount?: number) {

  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = !!favoriteItemsAmount

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
