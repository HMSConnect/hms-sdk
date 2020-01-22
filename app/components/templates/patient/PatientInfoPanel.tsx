import * as React from 'react'

import { Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  contentText: {
    color: '#37474f',
  },
  headerTitle: {
    color: 'grey',
  },
  nameTitle: {
    color: '#455a64',
  },
  root: {
    flexGrow: 1,
  },
  topicTitle: {
    color: 'grey',
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
            <Typography variant='h4' className={classes.nameTitle}>
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
              <Grid item xs={12} sm={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      Age :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='h6'
                      className={classes.contentText}
                    >
                      {_.get(info, 'age') || 'Unknow'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component='div' variant='body1'>
                      <Typography
                        variant='body1'
                        className={classes.topicTitle}
                        component='span'
                      >
                        Gender :{' '}
                      </Typography>
                      <Typography
                        component='span'
                        variant='h6'
                        className={classes.contentText}
                      >
                        {_.startCase(_.get(info, 'gender')) || 'Unknow'}
                      </Typography>
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      DOB :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='h6'
                      className={classes.contentText}
                    >
                      {_.get(info, 'birthDate')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      Phone :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='h6'
                      className={classes.contentText}
                    >
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
                  {info.email && (
                    <Grid item xs={12}>
                      <Typography
                        variant='body1'
                        className={classes.topicTitle}
                        component='span'
                      >
                        Email :{' '}
                      </Typography>
                      <Typography
                        component='span'
                        variant='h6'
                        className={classes.contentText}
                      >
                        {_.get(info, 'email') || 'Unknow'}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      Address :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='h6'
                      className={classes.contentText}
                    >
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
