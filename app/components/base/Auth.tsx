import AuthService from '@services/AuthService'
import * as React from 'react'
import routes from '../../routes'

export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper: any = (props: any) => {
    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        AuthService.logout(() => {
          routes.Router.pushRoute('/login')
        })
      }
    }

    React.useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx: any) => {
    let callbackIfEmbeddedWidget
    if (ctx.req && ctx.req.url.includes('embedded-widget')) {
      callbackIfEmbeddedWidget = () => {
        AuthService.redirect(ctx, '/login')
      }
    } else {
      callbackIfEmbeddedWidget = () => {
        AuthService.redirect(ctx, '/login')
      }
    }
    const token = AuthService.assignAuthDataIfApplicable(
      ctx,
      callbackIfEmbeddedWidget,
    )

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}
