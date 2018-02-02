import hash from './hash'

const ANONYM_SESSION = 'ANONYM_SESSION'

export const removeItem = logger =>
  (key) => {
    try {
      localStorage.removeItem(key)

      return true
    } catch (err) {
      logger.error(err)

      return null
    }
  }

export const setItem = logger =>
  (key, item, expiresInDays) => {
    try {
      let timestamp
      if (expiresInDays) {
        const now = new Date()
        timestamp = now.setDate(now.getDate() + expiresInDays)
      }

      localStorage.setItem(key, JSON.stringify({ value: item, timestamp }))

      return true
    } catch (err) {
      logger.error(err)

      return false
    }
  }

export const getItem = logger =>
  (item) => {
    try {
      const value = localStorage.getItem(item)
      const record = value ? JSON.parse(value) : null
      if (record && new Date().getTime() < record.timestamp) {
        return record.value
      }
      removeItem(item)
    } catch (err) {
      logger.error(err)

      return undefined
    }
  }

export const getLocalSession = logger =>
  () => {
    let session = getItem(logger)(ANONYM_SESSION)
    if (!session) {
      session = hash()
      setItem(logger)(ANONYM_SESSION, session)
    }

    return session
  }
