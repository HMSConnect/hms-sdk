import IAdapter from '@adapters/IAdapter'
import cookie from 'js-cookie'
import * as moment from 'moment'
import nextCookie from 'next-cookies'
import routes from '../routes'

export type IAuthLoginCallback = (error: any, response: any) => void
interface IAuthData {
  isAuthenticated: boolean
  token?: string
  expires?: number
  refresh_token?: string
  scope?: string
}
class AuthService {
  authChannel: BroadcastChannel | null = null

  defaultAdatper: IAdapter | null = null
  AUTH_ACCESS_TOKEN_KEY = 'hms_access_token'
  AUTH_REFRESH_TOKEN_KEY = 'hms_refresh_token'
  AUTH_EXPIRE_TIME = 'hms_expires'
  private authData: IAuthData = { isAuthenticated: false }

  constructor() {
    if (typeof window !== 'undefined') {
      this.authChannel = new BroadcastChannel('auth')
    }
  }

  getAuthData() {
    return this.authData
  }

  setDefaultAdapter(adapter: IAdapter) {
    this.defaultAdatper = adapter
  }

  getTokenAndExpiresTime = (ctx: any) => {
    const cookies = nextCookie(ctx)
    const token = ctx.query[this.AUTH_ACCESS_TOKEN_KEY]
    const exp = cookies[this.AUTH_EXPIRE_TIME]

    return {
      exp,
      token: token || cookies[this.AUTH_ACCESS_TOKEN_KEY],
    }
  }

  assignAuthDataIfApplicable = (token: string, refresh_token?: string) => {
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

  isValidToken = (token?: string, exp?: string) => {
    // TODO: check token time
    if (!token) {
      return false
    } else {
      if (exp) {
        return moment.default().isBefore(exp)
      }
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
      if (this.defaultAdatper && this.defaultAdatper.login) {
        this.defaultAdatper.login(authData, (error: any, response: any) => {
          if (error) {
            throw new Error(error)
          }
          this.handleLoginResult(response)
          if (this.authChannel) {
            this.authChannel.postMessage({ message: 'LOGIN' })
          }
          if (successCallback) {
            successCallback()
          }
        })
      }
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
    this.calculateExp(Number(result.expires_in))
    this.assignAuthDataIfApplicable(result.access_token, result.refresh_token)
  }

  calculateExp = (expires_in: number) => {
    const exp = moment.default().add(expires_in, 'seconds').toISOString()
    cookie.set(this.AUTH_EXPIRE_TIME, exp)
  }

  logout = (callback?: any, isFormEvent = false) => {
    this.authData = { isAuthenticated: false }
    cookie.remove(this.AUTH_ACCESS_TOKEN_KEY)
    cookie.remove(this.AUTH_REFRESH_TOKEN_KEY)
    cookie.remove(this.AUTH_EXPIRE_TIME)
    if (callback) {
      callback()
    } else {
      routes.Router.pushRoute('/login')
    }
  }
}

export default new AuthService()
