import IAdapter from '@adapters/IAdapter'

import cookie from 'js-cookie'
import decode from 'jwt-decode'
import nextCookie from 'next-cookies'
import routes from '../routes'
import { HMSService } from './HMSServiceFactory'
import intersection from 'lodash/intersection'
import auth from '@app/reducers-redux/auth.reducer'

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

  getMockToken = () => {
    return 'awdawdawd'
  }

  handleRequestWidget = (ctx: any, onInvalidToken?: any) => {
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
    this.assignAuthDataWithToken(token)
    return token
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
    // const decoded: any = decode(token)
    // let remaining_ms = decoded.exp * 1000 - new Date().getTime()
    // if (remaining_ms > 0) {
    //   this.authData = {
    //     isAuthenticated: true,
    //     token,
    //   }
    // } else {
    //   this.authData = { isAuthenticated: false }
    // }
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

  isGranted(ifAnyGranted: any): boolean {
    if (!this.authData.isAuthenticated) {
      return false
    }

    if (!ifAnyGranted) {
      return true
    }
    // return intersection([], ifAnyGranted).length > 0
    return true
  }

  handleAuthChanged = () => {
    // to handle refresh_token
  }

  login = async (authData: any, successCallback?: any, errorCallBack?: any) => {
    try {
      this.hms.Initial(
        {
          ...authData,
          client_id: '',
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
