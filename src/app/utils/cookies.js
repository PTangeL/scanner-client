export const readCookie = logger =>
  (name) => {
    let cookies = []
    try {
      cookies = document.cookie.split('; ').reduce((acumulator, currentValue) => {
        const cookie = currentValue.split('=')
        acumulator[cookie[0]] = cookie[1]
        return acumulator
      }, {})
    } catch (error) {
      logger.error(error)
    }

    return cookies[name]
  }

export const saveCookie = logger =>
  ({ name, value, path = '/', domain = `.${window.location.hostname}`, expiresInDays = 7 }) => {
    try {
      const now = new Date()
      now.setDate(now.getDate() + expiresInDays)
      const cookie = `${name}=${value}${path ? `; ${domain ? `domain=${domain};` : ''} path=${path}` : ''};expires=${now.toGMTString()};`
      document.cookie = cookie
    } catch (error) {
      logger.error(error)
    }
  }

export const removeCookie = logger =>
  ({ name, path = '/', domain = `.${window.location.hostname}` }) => {
    try {
      const cookie = `${name}=; ${domain ? `domain=${domain};` : ''} ${path ? `path=${path};` : ''} expires=Thu, 01 Jan 1970 00:00:01 GMT;`
      document.cookie = cookie
    } catch (error) {
      logger.error(error)
    }
  }
