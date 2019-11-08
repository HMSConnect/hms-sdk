import React, { useState } from "react";
import usePatient from "../hooks/usePatient";
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Switch,
  makeStyles
} from "@material-ui/core";
import PatientInfoPanel from "../base/PatientInfoPanel";
import PatientInfoTable from "../base/PatientInfoTable";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  bigAvatar: {
    margin: 10,
    width: 156,
    height: 156
  }
}));

function PatientInfoDetail() {
  const classes = useStyles();
  const { isLoading, data } = usePatient(
    "13f9b410-5436-45bc-a6d3-b4dff5391295"
  );
  if (isLoading) {
    return <div>Loading!!!...</div>;
  }
  return (
    <div className={classes.root}>
      <br />
      <br />
      <br />

      <Container maxWidth="lg">
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Avatar
                alt="Remy Sharp"
                src="../../static/images/mock-person-profile.png"
                className={classes.bigAvatar}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <PatientInfoPanel info={data} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={8}>
              {<PatientInfoTable info={data} />}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PatientInfoDetail;
