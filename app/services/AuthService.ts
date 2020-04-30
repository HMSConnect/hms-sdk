import IAdapter from '@adapters/IAdapter'
import environment from '@environment'
import cookie from 'js-cookie'
import nextCookie from 'next-cookies'
import routes from '../routes'

const hmshealthapi = require('@hmsconnect/hmshealthapi')

interface IAuthData {
  isAuthenticated: boolean
  token?: string
  expires?: number
  refresh_token?: string
  scope?: string
}
class AuthService {
  hms: any
  defaultAdatper: IAdapter | null = null
  AUTH_ACCESS_TOKEN_KEY = 'hms_access_token'
  AUTH_REFRESH_TOKEN_KEY = 'hms_refresh_token'
  private authData: IAuthData = { isAuthenticated: false }

  constructor() {
    this.hms = hmshealthapi()
  }

  getAuthData() {
    return this.authData
  }

  getHms() {
    return this.hms
  }

  setDefaultAdapter(adapter: IAdapter) {
    this.defaultAdatper = adapter
    if (this.defaultAdatper.setConfig) {
      this.defaultAdatper.setConfig(this.hms)
    }
  }

  getToken = (ctx: any) => {
    const cookies = nextCookie(ctx)
    const token = ctx.query[this.AUTH_ACCESS_TOKEN_KEY]

    return token || cookies[this.AUTH_ACCESS_TOKEN_KEY]
  }

  assignAuthDataIfApplicable = (token: string, refresh_token: string) => {
    if (token) {
      this.assignAuthDataWithToken(token)
      if (this.authData.isAuthenticated) {
        this.authData.refresh_token = refresh_token
      }
    }
  }

  assignAuthDataWithToken = (token: string) => {
    if (token) {
      this.authData = {
        isAuthenticated: true,
        token,
      }
    } else {
      this.authData = { isAuthenticated: false }
    }
  }

  redirect = (ctx: any, url?: string) => {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: url || '/login' })
      ctx.res.end()
    } else {
      routes.Router.pushRoute(url || '/login')
    }
  }

  isValidToken = (token?: string, refreshToken?: string | null) => {
    // TODO: check token time
    if (!token) {
      return false
    } else {
      return true
    }
  }

  isGranted(ifAnyGranted: any, isRedirect = false): boolean {
    // TODO: check granted
    // if (!this.authData.isAuthenticated) {
    //   return false
    // }

    if (!ifAnyGranted) {
      return true
    }
    return true
  }

  login = async (authData: any, successCallback?: any, errorCallBack?: any) => {
    try {
      this.hms.Initial(
        {
          ...authData,
          client_id: environment.auth.client_id,
        },
        (error: any, response: any) => {
          if (error) {
            throw new Error(error)
          }
          this.handleLoginResult(response)
          if (successCallback) {
            successCallback()
          }
        },
      )
    } catch (e) {
      console.info('error: ', e)
      if (errorCallBack) {
        errorCallBack(e)
      }
    }
  }

  handleLoginResult = (result: any) => {
    cookie.set(this.AUTH_ACCESS_TOKEN_KEY, result.access_token)
    cookie.set(this.AUTH_REFRESH_TOKEN_KEY, result.refresh_token)
    this.assignAuthDataIfApplicable(result.access_token, result.refresh_token)
  }

  logout = (callback?: any) => {
    this.authData = { isAuthenticated: false }
    cookie.remove(this.AUTH_ACCESS_TOKEN_KEY)
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now().toString())
    if (callback) {
      callback()
    } else {
      routes.Router.pushRoute('/login')
    }
  }
}

export default new AuthService()
