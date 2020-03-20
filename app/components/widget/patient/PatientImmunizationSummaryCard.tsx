import React from 'react'

import CardLayout from '@components/base/CardLayout'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useResourceList from '@components/hooks/useResourceList'
import {
  Grid,
  Icon,
  lighten,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import get from 'lodash/get'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  clickable: {
    cursor: 'pointer',
  },
  contentText: {
    fontWeight: 'normal',
  },
  footerContainer: { height: 36, color: 'grey' },
  hover: {
    '&:hover': {
      backgroundColor: '#ddd4',
    },
    textDecoration: 'none',
  },
  infoIcon: {
    color: '#1976d2',
    zoom: 0.7,
  },
  selectedCard: {
    backgroundColor: '#ddd4',
    border: '2px solid #00b0ff',
    borderRadius: 4,
  },
  unitText: {
    fontWeight: 'normal',
  },
}))

export const PatientImmunizationSummerCardWithConnector: React.FunctionComponent = () => {
  const state = useSelector(
    (state: any) => state.patientImmunizationSummaryCard,
  )
  return <PatientImmunizationSummerCard patientId={get(state, 'patientId')} mouseTrackCategory={get(state, 'mouseTrackCategory')} />
}

const PatientImmunizationSummerCard: React.FunctionComponent<any> = ({
  patientId,
  mouseTrackCategory = 'patient_immunization_summary_card',
  mouseTrackLabel = 'patient_immunization_summary_card',
}) => {
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList,
    error,
  } = useResourceList(patientId, {
    filter: { domainResouce: 'immunization' },
  })
  if (error) {
    return <ErrorSection error={error} />
  }

  if (isGroupResourceListLoading) {
    return <LoadingSection />
  }
  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%' }}>
        <PatientImmunizationSummerCardView
          immunization={groupResourceList[1]}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default PatientImmunizationSummerCard

const PatientImmunizationSummerCardView: React.FunctionComponent<any> = ({
  immunization,
}) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Total Immunization'
      option={{
        isHideIcon: true,
        style: {
          backgroundColor: lighten('#afb42b', 0.85),
          color: '#afb42b',
        },
      }}
    >
      <Grid container style={{ height: '100%' }}>
        <Typography
          component='div'
          variant='body1'
          style={{
            backgroundColor: '#afb42b',
            flex: 1,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          className={clsx(classes.bodyCard)}
        >
          <Icon
            style={{ color: 'white', fontSize: '2.2em', textAlign: 'center' }}
            className={clsx('fas fa-syringe')}
          />
        </Typography>
        <Typography
          component='div'
          variant='body1'
          style={{
            flex: 4,
            paddingLeft: 16,
            paddingRight: 16,
            textAlign: 'center',
          }}
          className={clsx(classes.bodyCard)}
        >
          <Typography
            component='span'
            variant='h4'
            className={classes.contentText}
            style={{
              color: get(immunization, 'totalCount') === 0 ? undefined : 'gray',
              paddingRight: 8,
            }}
          >
            {get(immunization, 'totalCount') || '0'}
          </Typography>{' '}
        </Typography>
      </Grid>
    </CardLayout>
  )
}
