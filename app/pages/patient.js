import React, { useState } from "react";
import dynamic from 'next/dynamic'
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import Router from 'next/router'
import Container from '@material-ui/core/Container';
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { Root, Header, Nav, Content, Footer, presets } from "mui-layout";

import PatientInfo from '../components/widget/PatientInfo';

export default class PatientView extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        
      }
  }

  componentDidMount() {
    
  }

  render() {
      
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <PatientInfo/>
        </Container>
      </React.Fragment>
    )

  }
}