import * as React from 'react'

import environment from '@environment'
import RouteManager from '@routes/RouteManager'
import AuthService from '@services/AuthService'
import get from 'lodash/get'
import { stringify } from 'qs'
import routes from '../../routes'
import includes from 'lodash/includes'

const withAuthSyncTest = (
  WrappedComponent: any,
  ifAnyGranted?: any[],
  props?: any,
) => {
  let backTo: any
  const Wrapper: any = (props: any) => {
    const authChannel = AuthService.authChannel

    // Listen for channel messages
    if (authChannel) {
      authChannel.onmessage = (event) => {
        // Lookup existing auth key for the current tab (if any)

        switch (event.data.message) {
          // A new tab has opened
          case 'LOGIN':
            // If the current tab has an auth access_token, broadcast it
            const path = RouteManager.getPath(get(props, 'query.backTo') || '/')
            routes.Router.pushRoute(path)

            break
        }
      }
    }

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx: any, token: string, exp: any) => {
    let callbackIfEmbeddedWidget
    const pathName = get(ctx, 'pathname')
    backTo = get(ctx, 'req.url')
    const backToObj = {
      backTo: get(ctx, 'req.url'),
    }
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))
    if (environment.disableAuthen) {
      return { ...componentProps }
    }
    if (ctx.req && includes(ctx.req.url, 'embedded-widget')) {
      callbackIfEmbeddedWidget = () => {
        AuthService.redirect(
          ctx,
          `/login${backTo ? `?${stringify(backToObj)}` : ''}`,
        )
      }
    } else {
      callbackIfEmbeddedWidget = () => {
        AuthService.redirect(
          ctx,
          `/login${backTo ? `?${stringify(backToObj)}` : ''}`,
        )
      }
    }
    if (includes(pathName, 'login')) {
      return { ...componentProps, token }
      // if (
      //   !AuthService.isValidToken(token, exp) ||
      //   !AuthService.isGranted(ifAnyGranted)
      // ) {
      //   return { ...componentProps, token }
      // }else{
      //   AuthService.redirect(
      //     ctx,
      //     `${backTo ? backTo : '/'}`,
      //   )
      // }
    } else {
      if (
        !AuthService.isValidToken(token, exp) ||
        !AuthService.isGranted(ifAnyGranted)
      ) {
        AuthService.redirect(
          ctx,
          `/login${backTo ? `?${stringify(backToObj)}` : '/'}`,
        )
        return
      }
    }

    AuthService.assignAuthDataIfApplicable(token)
    return { ...componentProps, token }
  }

  return Wrapper
}

export const withAuthSync = withAuthSyncTest
