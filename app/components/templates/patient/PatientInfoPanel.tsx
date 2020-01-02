import * as React from 'react'

import environment from '@environment'
import { Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'
import * as moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const PatientInfoPanel: React.FunctionComponent<{
  patient: any
}> = ({ patient: info }) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5'>
              {_.isArray(_.get(info, 'name.prefix'))
                ? _.join(_.get(info, 'name.prefix'), ' ')
                : _.get(info, 'name.prefix')}{' '}
              {_.isArray(_.get(info, 'name.given'))
                ? _.join(_.get(info, 'name.given'), ' ')
                : _.get(info, 'name.given')}{' '}
              {_.isArray(_.get(info, 'name.family'))
                ? _.join(_.get(info, 'name.family'), ' ')
                : _.get(info, 'name.family')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Gender : {_.get(info, 'gender') || 'Unknow'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Email : {_.get(info, 'email') || 'Unknow'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      ID : {_.get(info, 'identifier.id.value') || 'Unknow'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      DOB : {_.get(info, 'birthDate')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Phone :{' '}
                      {_.get(info, 'telecom')
                        ? _.isArray(_.get(info, 'telecom'))
                          ? _.join(
                              _.map(_.get(info, 'telecom'), (tel: any) =>
                                _.get(tel, 'value'),
                              ),
                              ' ',
                            )
                          : _.get(info, 'telecom')
                        : 'Unknow'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      MRN : {_.get(info, 'identifier.dl.value') || 'Unknow'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Age : {_.get(info, 'age') || 'Unknow'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Address :{' '}
                      {_.get(info, 'address')
                        ? `${
                            _.isArray(_.get(info, 'address[0].line'))
                              ? _.join(_.get(info, 'address[0].line'), ' ')
                              : _.get(info, 'address[0].line')
                          } ${_.get(info, 'address[0].postalCode')} ${_.get(
                            info,
                            'address[0].city',
                          )} ${_.get(info, 'address[0].country')}`
                        : 'Unknow'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Deceased :{' '}
                      {_.get(info, 'deceasedDateTime')
                        ? moment
                            .default(_.get(info, 'deceasedDateTime'))
                            .format(environment.localFormat.dateTime)
                        : 'Unknow'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default PatientInfoPanel
