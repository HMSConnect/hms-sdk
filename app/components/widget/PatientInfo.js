import React from "react";
import axios from 'axios';
import ReactDOM from "react-dom";

import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';

// Standard component
import SFHIRPatient from '../standards/smart_fhir/SFHIRPatient';
import HMSPatient from '../standards/hms_connect/HMSPatient';

// Base component
import PatientInfoPanel from '../base/PatientInfoPanel';
import PatientInfoTable from '../base/PatientInfoTable';

// Mock data of each standard
import MockSFHIRPatient from '../../src/mock/standards/smart_fhir/patient.js'
import MockHMSPatient from '../../src/mock/standards/hms_connect/patient.js'
// Initial standard
const SFHIRPatientObj = SFHIRPatient();
const HMSPatientObj = HMSPatient();
// Prepare mock data
const mockSFHIRPatient = MockSFHIRPatient();
const mockHMSPatient = MockHMSPatient();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bigAvatar: {
    margin: 10,
    width: 156,
    height: 156,
  },
}));

class PatientInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patient:null,
      isSFHIRStandard: true
    };
  }

  componentDidMount(){
    this.loadDataByStandard(this.state.isSFHIRStandard)
  }

  loadDataByStandard(isSFHIRStandard) {
    let info = null;
    let _this = this;
    let sanboxEndpoint;

    if(!isSFHIRStandard) {
      sanboxEndpoint = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/hms_connect/patient`;
    } else {
      sanboxEndpoint = 'https://r2.smarthealthit.org/Patient/smart-1551992';
    }
    
    this.callingAPI(
      sanboxEndpoint, 
      'GET',
      null,
      null,
      function(data) {
        console.log('callingAPI:', data)

        if(HMSPatientObj.isValid(data)) {
          HMSPatientObj.setData(data);
          info = HMSPatientObj.compile();
        } else if(SFHIRPatientObj.isValid(data)) {
          SFHIRPatientObj.setData(data);
          info = SFHIRPatientObj.compile();
        } else {
          alert('Sorry, we are not support current data standard!')
        }
          
        if(info) {
          console.log('info:', info)
          _this.setState({ patient:info });
        }
      }
    );
  }

  handleSwitchChange(e) {
    let tmp = {};
    tmp[event.target.name] = event.target.checked;
    console.log('handleSwitchChange:', tmp)
    this.setState(tmp);

    this.loadDataByStandard(event.target.checked);
  }

  callingAPI(endpoint, method, data, authToken, callback) {
    let apiOpt = {
        method: method,
        url: endpoint, data: data,
        withCredentials: false, json: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if(authToken) {
        apiOpt.headers['Authorization'] = 'Bearer ' + authToken;
    }
    
    axios(apiOpt).then(response => {
        console.log('callingAPI : ', response)
        if(typeof callback === 'function') {
            callback(response.data)
        }
    }).catch(err => {
        console.log('callingAPI error : ', err)
        if(typeof callback === 'function') {
            callback(err)
        }
    });
  }

  render() {

    const { classes } = this.props;
    let { patient, isSFHIRStandard } = this.state;

    return (
      <div className={classes.root}>

        <br/>
        <br/>
        <br/>

        <Container maxWidth='lg'>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Avatar 
                  alt="Remy Sharp" 
                  src="../../static/images/mock-person-profile.png" 
                  className={classes.bigAvatar} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  {
                    <PatientInfoPanel info={patient}/>
                  }
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Grid container spacing={3}>
                  <Typography component="div">
                    <small>Standard:</small>
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid item><small>HMSConnect</small></Grid>
                      <Grid item>
                        <Switch 
                          name='isSFHIRStandard'
                          checked={isSFHIRStandard} 
                          onChange={(e) => this.handleSwitchChange(e)} 
                          value="smart_fhir" />
                      </Grid>
                      <Grid item><small>SmartFHIR</small></Grid>
                    </Grid>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={8}>
              {
                <PatientInfoTable info={patient} />
              }
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default function PatientInfoView(props) {
  const classes = useStyles();
  
  return (
    <PatientInfo classes={classes} {...props}/>
  )
};
