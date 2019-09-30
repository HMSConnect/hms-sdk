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

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const brandObjs = {
    favicon:{
      name:"AAS",
      alt:"favicon",
      src:`${staticFolder}/static/images/favicon.png`
    },
    aas:{
      name:"AAS",
      alt:"AAS",
      src:`${staticFolder}/static/images/favicon.png`
    }
  }

  const authMenuObjList = [
    { 
      text:'Register', icon:<RegisterIcon />, link:'signup'
    },
    // { 
    //   text:'Sign In', icon:<InputIcon />, link:'signin'
    // },
    // { 
    //   text:'Sign In via sample App', icon:<InputIcon />, link:'signin?client_id=YfaWXowVNHegc3qeLLnHXYFeQ4hJheCh&redirect_url='
    // }
  ]

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button key={brandObjs.aas.name}>
          <ListItemAvatar>
            <Avatar alt={brandObjs.aas.alt} src={brandObjs.aas.src} className={classes.bigAvatar} />
          </ListItemAvatar>
          <ListItemText primary={brandObjs.aas.name} />
        </ListItem>
      </List>
      <List>
        {authMenuObjList.map((menuObj, index) => (
          <Link route={menuObj.link} key={menuObj.text}>
            <ListItem button key={menuObj.text}>
                <ListItemIcon>{menuObj.icon}</ListItemIcon>
                <ListItemText primary={menuObj.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {/** ANY LIST */}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar toggleDrawer={toggleDrawer} brand={brandObjs.favicon}/>
      
      {/* <MainContent>
      </MainContent> */}

      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>

      <Container maxWidth="lg">
      
      </Container>

      <br></br>
      <Footer/>
    </React.Fragment>
  )
};