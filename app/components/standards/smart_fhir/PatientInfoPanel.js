import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PatientInfoPanel(props) {
    const classes = useStyles();
    let { info } = props;

    return (
        <div className={classes.root}>

            <br/>
            <br/>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                    {
                        info
                        ? `${
                            info.name.prefix
                            ? info.name.prefix?info.name.prefix.map(v=>(v+' ')):''
                            : ''
                            }${
                            info.name.given
                            ? info.name.given?info.name.given.map(v=>(v+' ')):''
                            : ''
                            }${
                            info.name.family
                            ? info.name.family?info.name.family.map(v=>(v+' ')):''
                            : ''
                            }`
                        : 'Unknown'
                    }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`Gender : ${info?info.gender?info.gender:'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`Email : ${info?info.email?info.email:'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`ID : ${info?info.identifier?info.identifier.id?info.identifier.id.value:'Unknown':'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`DOB : ${info?info.birthDate?info.birthDate:'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`Phone : ${info?info.telecom?info.telecom[0].value:'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`MRN : ${info?info.identifier?info.identifier.dl?info.identifier.dl.value:'Unknown':'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`Age : ${info?info.age?info.age:'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`Address : ${
                                        info
                                        ? info.address
                                        ? `${info.address[0].line.map(v=>(v+' '))}${
                                            info.address[0].postalCode?info.address[0].postalCode:''} ${
                                            info.address[0].city?info.address[0].city:''} ${
                                            info.address[0].country?info.address[0].country:''}`
                                        : 'Unknown'
                                        : 'Unknown'
                                        }`
                                    }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                    {`Deceased : ${info?info.deceasedDateTime?info.deceasedDateTime:'Unknown':'Unknown'}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

            <br/>
            <br/>

        </div>
    );
};
