import React from "react";
import Container from "@material-ui/core/Container";
import PatientInfoDetail from "../components/widget/PatientInfoDetail";
export default class PatientInfoView extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Container maxWidth="lg">
          <PatientInfoDetail />
        </Container>
      </React.Fragment>
    );
  }
}
