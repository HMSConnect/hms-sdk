import IAdapter from '@adapters/IAdapter'

import cookie from 'js-cookie'
import decode from 'jwt-decode'
import nextCookie from 'next-cookies'
import routes from '../routes'

class AuthService {
  defaultAdatper: IAdapter | null = null
  AUTH_ACCESS_TOKEN_KEY = 'hms_access_token'
  AUTH_REFRESH_TOKEN_KEY = 'hms_refresh_token'

  setDefaultAdapter(adapter: IAdapter) {
    this.defaultAdatper = adapter
  }

  getToken = (ctx: any) => {
    const cookies = nextCookie(ctx)
    const token = ctx.query[this.AUTH_ACCESS_TOKEN_KEY]

    return token || cookies[this.AUTH_ACCESS_TOKEN_KEY]
  }

  getMockToken = () => {
    return 'awdawdawd'
  }

  assignAuthDataIfApplicable = (ctx: any, onInvalidToken?: any) => {
    const token = this.getToken(ctx)
    // If there's no token, it means the user is not logged in.
    // if (!token || !this.validToken(token)) {
    if (!token) {
      if (onInvalidToken) {
        onInvalidToken()
      } else {
        this.redirect(ctx)
      }
      return
    }
    return token
  }

  redirect = (ctx: any, url?: string) => {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: url || '/login' })
      ctx.res.end()
    } else {
      routes.Router.pushRoute(url || '/login')
    }
  }

  validToken = (token?: string, refreshToken?: string | null) => {
    // check token time
    if (!token) {
      return false
    }
    const decoded: any = decode(token)
    const remainingMs = decoded.exp * 1000 - new Date().getTime()
    // console.info('remainingMs awdawd :', remainingMs)
    if (remainingMs <= 0) {
      return false
    }
    return true
  }

  handleAuthChanged = () => {
    // to handle refresh_token
  }

  login = async (authData: any, successCallback?: any, errorCallBack?: any) => {
    try {
      if (!this.defaultAdatper) {
        return
      }
      // const json: any = await this.defaultAdatper.doRequest(
      //   `api/login`,
      //   authData,
      // )
      // const token = json.token
      const token = this.getMockToken()
      cookie.set(this.AUTH_ACCESS_TOKEN_KEY, token)
      if (successCallback) {
        successCallback()
      }
    } catch (e) {
      console.info('error: ', e)
      if (errorCallBack) {
        errorCallBack(e)
      }
    }
  }

  logout = (callback?: any) => {
    cookie.remove(this.AUTH_ACCESS_TOKEN_KEY)
    // to support logging out from all windows
    console.info('logout: ')
    window.localStorage.setItem('logout', Date.now().toString())
    if (callback) {
      callback()
    } else {
      routes.Router.pushRoute('/login')
    }
  }
}

export default new AuthService()
