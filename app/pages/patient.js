import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import PatientInfo from '@components/widget/PatientInfo'

export default class PatientView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth='lg'>
          <PatientInfo />
        </Container>
      </React.Fragment>
    )
  }
}
