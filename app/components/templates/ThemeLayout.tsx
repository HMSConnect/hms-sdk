import * as React from 'react'

import {
  themeChange,
  themeCustom,
  themeObjectSet,
} from '@app/actions/theme.action'
import ThemeManager from '@app/styles/ThemeManager'
import LoadingSection from '@components/base/LoadingSection'
import { ThemeOptions, ThemeProvider } from '@material-ui/core'
import { MessageListenerService } from '@services/MessageListenerService'
import { connect } from 'react-redux'

class ThemeLayout extends React.Component<any> {
  componentDidMount() {
    ThemeManager.setDefaultTheme(this.props.defaultTheme)
    this.props.onThemeChange(this.props.defaultTheme)
    if (typeof window !== 'undefined') {
      MessageListenerService.registerMessage('setTheme', (data: any) => {
        this.props.onThemeChange(data)
      })
      MessageListenerService.registerMessage('setCustomTheme', (data: any) => {
        const themeObject = ThemeManager.getThemeObject(data.themeName)
        const newThemeObject = ThemeManager.mergeThemeWithCustomTheme(
          themeObject,
          data.themeObject,
        )
        this.props.onThemeSet(newThemeObject)
      })
    }
  }

  render() {
    const { themeType } = this.props
    if (!themeType.themeObject) {
      return <LoadingSection />
    }
    return (
      <ThemeProvider theme={themeType.themeObject}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    themeType: state.themeType,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onThemeChange: (theme: string) => {
      dispatch(themeChange(theme))
    },
    onThemeSet: (themeObject: ThemeOptions) => {
      dispatch(themeObjectSet(themeObject))
    },
    onThemeCustom: (themeObject: ThemeOptions, themeName: string) => {
      dispatch(themeCustom(themeObject, themeName))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeLayout)
