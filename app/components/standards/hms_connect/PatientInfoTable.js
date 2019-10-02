import React from "react";
import ReactDOM from "react-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

export default function PatientInfoView(props) {
    const classes = useStyles();
    let { info } = props;

    return (
        <div className={classes.root}>

            <br/>
            <br/>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body2"><strong>Patient</strong></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} sm={5}>
                            <Typography variant="caption"><strong>Identifier</strong></Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="caption"><strong>Name</strong></Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="caption"><strong>Gender</strong></Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="caption"><strong>Birth Date</strong></Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={5}>
                            <Typography variant="caption">
                            {
                                info
                                ? info.identifier
                                ? Object.keys(info.identifier).map(keyName => {
                                    return (
                                        <Typography variant="body2" key={keyName}>
                                            {`${info.identifier[keyName].systemCode} : ${
                                                info.identifier[keyName].value}`}
                                        </Typography>
                                    )
                                })
                                : ''
                                : ''
                            }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="body2">
                            {
                                info
                                ? `${
                                    info.name.prefix
                                    ? Array.isArray(info.name.prefix)
                                    ? info.name.prefix.map(v=>(v+' '))
                                    : (info.name.prefix+' ')
                                    : ''
                                    }${
                                    info.name.givenName
                                    ? Array.isArray(info.name.givenName)
                                    ? info.name.givenName.map(v=>(v+' '))
                                    : (info.name.givenName+' ')
                                    : ''
                                    }${
                                    info.name.middleName
                                    ? Array.isArray(info.name.middleName)
                                    ? info.name.middleName.map(v=>(v+' '))
                                    : (info.name.middleName+' ')
                                    : ''
                                    }${
                                    info.name.familyName
                                    ? Array.isArray(info.name.familyName)
                                    ? info.name.familyName.map(v=>(v+' '))
                                    : (info.name.familyName+' ')
                                    : ''
                                    }`
                                : 'Unknown'
                            }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="body2">{info?info.gender?info.gender:'':''}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="body2">{info?info.birthDate?info.birthDate:'':''}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <br/>
            <br/>

        </div>
    );
};
