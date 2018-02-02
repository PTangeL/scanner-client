import { setItem, getItem, removeItem } from './localStorage'
import { saveCookie, readCookie, removeCookie } from './cookies'

export const persist = logger =>
  ({ key, value, path, expiresInDays }) => {
    saveCookie(logger)({ name: key, value, path, expiresInDays })
    setItem(logger)(key, value, expiresInDays)
  }

export const find = logger => key => readCookie(logger)(key) || getItem(logger)(key)

export const remove = logger =>
  (key) => {
    removeCookie(logger)({ name: key })
    removeItem(logger)(key)
  }
