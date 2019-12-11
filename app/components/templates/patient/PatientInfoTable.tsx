import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export default function PatientInfoTable({ patient: info }: any) {

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6'>
            <strong>Patient</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={5}>
              <Typography variant='subtitle1'>
                <strong>Identifier</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant='subtitle1'>
                <strong>Name</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='subtitle1'>
                <strong>Gender</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='subtitle1'>
                <strong>Birth Date</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={5}>
              <Typography variant='subtitle2'>
                {info
                  ? info.identifier
                    ? Object.keys(info.identifier).map((keyName: any) => {
                        return (
                          <Typography variant='body2' key={keyName}>
                            {`${info.identifier[keyName].systemCode} : ${info.identifier[keyName].value}`}
                          </Typography>
                        )
                      })
                    : ''
                  : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant='body2'>
                {info
                  ? `${
                      info.name.prefix && Array.isArray(info.name.prefix)
                        ? info.name.prefix.join(` `)
                        : ''
                    }${
                      info.name.prefix
                        ? info.name.prefix.length > 0
                          ? ' '
                          : ''
                        : ''
                    }${
                      info.name.given && Array.isArray(info.name.given)
                        ? info.name.given.join(` `)
                        : ''
                    }${
                      info.name.given
                        ? info.name.given.length > 0
                          ? ' '
                          : ''
                        : ''
                    }${
                      info.name.family && Array.isArray(info.name.family)
                        ? info.name.family.map(
                            (v: any, i: any) =>
                              `${v}${
                                i < info.name.family.length - 1 ? ' ' : ''
                              }`
                          )
                        : ''
                    }`
                  : 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='body2'>
                {info ? (info.gender ? info.gender : '') : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='body2'>
                {info ? (info.birthDate ? info.birthDate : '') : ''}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
