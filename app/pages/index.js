import React from 'react';
import getConfig from 'next/config';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from '../routes'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InputIcon from '@material-ui/icons/Input';
import RegisterIcon from '@material-ui/icons/HowToVote';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';

const { staticFolder } = getConfig().publicRuntimeConfig;
const useStyles = makeStyles(theme => ({
  card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      color: theme.palette.text.secondary,
  },
  cardMedia: {
      paddingTop: '56.25%', // 16:9
  },
  cardContent: {
      flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function App() {

  const brandObjs = {
    favicon:{
      name:"HMS Widget SDK",
      alt:"favicon",
      src:`${staticFolder}/static/images/favicon.png`
    },
    hms_widget_sdk:{
      name:"HMS Widget SDK",
      alt:"HMS Widget SDK",
      src:`${staticFolder}/static/images/favicon.png`
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="lg">
        <Link href="/patient">Patient</Link>
      </Container>
      <Container maxWidth="lg">
        <Link href="/patient-info">PatientInfo</Link>
      </Container>

    </React.Fragment>
  )
};