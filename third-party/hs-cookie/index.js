import jsCookie from 'js-cookie'

export default class cookie {
  static get(name, opts = {}) {
    return jsCookie.get(name, {...opts, domain: process.env.REACT_APP_COOKIE_DOMAIN});
  }

  static set(name, value, opts = {}) {
    jsCookie.set(name, value, {
      ...opts,
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
    })
  }

  static remove(name, opts = {}) {
    jsCookie.remove(name, {...opts, domain: process.env.REACT_APP_COOKIE_DOMAIN})
  }
}
