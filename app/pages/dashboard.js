import React, { useState } from "react";
import dynamic from 'next/dynamic'
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import Router from 'next/router'
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { Root, Header, Nav, Content, Footer, presets } from "mui-layout";

import auth from '../../sdk/components/authentication/AAS';
import { Link } from '../routes'

const aasAuth = auth();

const HMSAdminLayout  = dynamic(
  () => import("../components/admin/HMSAdminLayout"),
  { ssr: false }
)

const HMSUserLayout = dynamic(
  () => import("../components/user/HMSUserLayout"),
  { ssr: false }
)

export default class DashboardView extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          email: '',
          password: '',
          currentUser: null,
          message: '',
          authResult: '',
          isAdmin:false,
          isAuth:false
      }

      this.logout = this.logout.bind(this)
      this.testCallAPI = this.testCallAPI.bind(this)
  }

  logout (e) {
    e.preventDefault()
    auth.signOut().then(response => {
        this.setState({
        currentUser: null
        })
    })
  }

  componentDidMount() {
    // auth.onAuthStateChanged(user => {
    //     if (user) {
    //       this.setState({
    //           currentUser: user
    //       })
    //     } else {
    //       Router.push('/signin');
    //     }
    // })

    aasAuth.authenticate()
    .then( isAuth => {
      this.setState({ isAuth:isAuth })
    })
    .catch(err=>{
      console.log('authenticate error : ', err)
    })
  }

  async testCallAPI(e) {

    let apiOpt = {
        method: 'POST',
        url: `${process.env.APP_HOST}:${process.env.API_PORT}/api/v1`,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.currentUser.ra, // ID token
        },
        json: true
    };

    axios(apiOpt)
    .then(response => {
        console.log(response);
        this.setState({ authResult:response.data.result })
    })
    .catch(err => {
        console.log(err);
        alert(JSON.stringify(err))
    });
  }

  render() {
    const { message, currentUser, isAuth } = this.state;
    const { loadState, standardLayout, isAdmin } = this.props;

    // if(currentUser && currentUser.emailVerified) {
    
    if(isAuth) {
      if(isAdmin) {
        return (
          <HMSAdminLayout/>
        )
      } else {
        return (
          <HMSUserLayout/>
        )
      }

    } else {
      
      return (
        <React.Fragment>
          <CssBaseline />
          <Footer/>
        </React.Fragment>
      )
    }
  }
}