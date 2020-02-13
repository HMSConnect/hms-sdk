import * as React from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import ErrorSection from '@components/base/ErrorSection'
import GraphBase from '@components/base/GraphBase'
import LoadingSection from '@components/base/LoadingSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { mergeWithObservationInitialFilterQuery } from '@data-managers/ObservationDataManager'
import { ArgumentScale } from '@devexpress/dx-react-chart'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@material-ui/core'
import { parse } from '@utils'
import { scaleTime } from 'd3-scale'
import * as _ from 'lodash'
import usePatient from '@components/hooks/usePatient'

const mapObservaionCode = (codes: string[]) => {
  return _.reduce(
    codes,
    (acc, code) => {
      const findObservationName = _.find(
        OBSERVATION_CODE,
        (observation: any) => {
          return observation.code === code
        },
      )
      if (findObservationName) {
        return { ...acc, [findObservationName.value]: true }
      }
      return acc
    },
    {},
  )
}

const ObservationSummaryGraph: React.FunctionComponent<any> = ({
  query,
  initialFilter: customInitialFilter = {
    codes: undefined,
    encounterId: undefined,
    patientId: undefined,
    selection: {
      [OBSERVATION_CODE.BLOOD_PRESSURE.value]: false,
      [OBSERVATION_CODE.BODY_MASS_INDEX.value]: false,
      [OBSERVATION_CODE.BODY_WEIGHT.value]: false,
    },
  },
  max = 100,
  optionsGraph = {},
}) => {
  const initialFilter = React.useMemo(() => {
    const codes = `${OBSERVATION_CODE.BLOOD_PRESSURE.code},${OBSERVATION_CODE.BODY_MASS_INDEX.code}`
    const codeArray = _.split(codes || '', ',')
    const selection = mapObservaionCode(codeArray)
    return mergeWithObservationInitialFilterQuery(
      {
        ...customInitialFilter,
        selection: {
          ...customInitialFilter.selection,
          ...selection,
        },
      },
      {
        // encounterId: _.get(query, 'encounterId'),
        codes,
        patientId: _.get(query, 'patientId'),
      },
    )
  }, _.values(customInitialFilter))

  const {
    isLoading: isPatientLoading,
    data: patient,
    error: patientErrir,
  } = usePatient(_.get(query, 'patientId') || _.get(query, 'id'))

  const [{ filter, submitedFilter }, dispatch] = React.useReducer(
    tableWithFilterReducer,
    tableWithFilterState,
  )

  React.useEffect(() => {
    dispatch({ type: 'INIT_FILTER', payload: initialFilter })
    setFilter(initialFilter)
  }, [])

  const {
    isLoading,
    data: observationList,
    error,
    setFilter,
  } = useObservationList({
    filter: initialFilter,
    max,
  })

  const submitSearch = (filter: any) => {
    const observationCode = _.chain(filter.selection)
      .map((value, key) => {
        if (!value) {
          return false
        }
        const findObservationName = _.find(
          OBSERVATION_CODE,
          (observation: any) => {
            return observation.value === key
          },
        )
        return _.get(findObservationName, 'code') || ''
      })
      .filter((value: any) => value)
      .value()
    const newFilter = {
      ...filter,
      codes: _.join(observationCode, ','),
    }
    dispatch({ type: 'SUBMIT_SEARCH', payload: newFilter })
    setFilter(newFilter)
  }

  const handleParameterChange = (type: string, value: any) => {
    const selectionPayload = parse(`${type}=${value}`)
    dispatch({
      payload: selectionPayload,
      type: 'FILTER_ON_CHANGE',
    })
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    submitSearch(filter)
    closeModal()
  }

  const handleSearchReset = () => {
    submitSearch(initialFilter)
    closeModal()
  }

  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Observation Selection',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          group: [
            {
              label: 'Blood Pressure',
              name: OBSERVATION_CODE.BLOOD_PRESSURE.value,
              value: OBSERVATION_CODE.BLOOD_PRESSURE.code,
            },
            {
              label: 'Body Mass Index',
              name: OBSERVATION_CODE.BODY_MASS_INDEX.value,
              value: OBSERVATION_CODE.BODY_MASS_INDEX.code,
            },
            {
              label: 'Body Weight',
              name: OBSERVATION_CODE.BODY_WEIGHT.value,
              value: OBSERVATION_CODE.BODY_WEIGHT.code,
            },
          ],
          label: 'Selection',
          name: 'selection',
          type: 'checkbox-group',
        },
      ],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  const calculateNormalRage = (observation: any, patientInfo?: any) => {
    const normalRange = _.find(observation.referenceRange, range => {
      return (
        range.type === 'normal' &&
        (_.get(range, 'age.low') < patientInfo.age ||
          _.get(range, 'age.high') > patientInfo.age)
      )
    })
    let results: any = {}
    if (!_.isEmpty(normalRange)) {
      if (_.get(normalRange, 'low')) {
        _.camelCase(`normal${observation.codeText}low`)
        results[_.camelCase(`normal${observation.codeText}Low`)] = _.get(
          normalRange,
          'low',
        )
      }
      if (_.get(normalRange, 'high')) {
        results[_.camelCase(`normal${observation.codeText}High`)] = _.get(
          normalRange,
          'high',
        )
      }
    }

    return results
  }

  const prepareGraphData = (data: any) => {
    const newValue: any[] = _.chain(data)
      .map(item => {
        const objectData = _.reduce(
          item['valueModal'],
          (acc, v) => {
            const key = _.camelCase(v.code)
            let objectNormalData
            // console.log('item :', item);
            if (key === 'bodyMassIndex') {
              objectNormalData = calculateNormalRage(item, patient)
            }
            return {
              ...acc,
              ...objectNormalData,
              [key]: v.value,
            }
          },
          {},
        )

        return {
          ...objectData,
          issuedDate: item['issuedDate'],
        }
      })
      .groupBy('issuedDate')
      .map((data, key) => {
        return _.reduce(
          data,
          (acc, v, k) => {
            return { ...acc, ...v }
          },
          {},
        )
      })
      .value()
    return newValue
  }

  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading || isPatientLoading) {
    return <LoadingSection />
  }

  if (!submitedFilter.codes) {
    return (
      <div style={{ height: '100%' }}>
        <ToolbarWithFilter
          title={'Summary Graph'}
          onClickIcon={showModal}
          option={{
            style: {
              backgroundColor: '#ef5350',
              color: '#e1f5fe',
            },
          }}
        >
          {renderModal}
        </ToolbarWithFilter>
        <Typography
          component='div'
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '87%',
            justifyContent: 'center',
          }}
        >
          <Typography variant='body1'>
            Please Choose Category to display
          </Typography>
        </Typography>
      </div>
    )
  }
  return (
    <>
      <ToolbarWithFilter
        title={'Summary Graph'}
        onClickIcon={showModal}
        option={{
          style: {
            backgroundColor: '#ef5350',
            color: '#e1f5fe',
          },
        }}
      >
        {renderModal}
      </ToolbarWithFilter>
      <ObservationSummaryGraphView
        key={`${observationList.length}`}
        observationList={observationList}
        submitedFilter={submitedFilter}
        prepareGraphData={prepareGraphData}
        options={optionsGraph}
      />
    </>
  )
}

const ObservationSummaryGraphView: React.FunctionComponent<any> = ({
  submitedFilter,
  observationList,
  prepareGraphData,
  options,
}) => {
  return (
    <>
      <GraphBase
        key={`${submitedFilter.codes}`}
        data={observationList}
        argumentField='issuedDate'
        optionStyle={{
          color: '#e57373',
        }}
        options={{
          ...options,
          ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
          // ValueScale: <ValueScale modifyDomain={() => [0, 250]} />,
          customPrepareGraphData: prepareGraphData,
          includeLegend: true,
          type: 'line',
        }}
      />
      <MultiSelectForm />
    </>
  )
}

const MultiSelectForm: React.FunctionComponent<any> = ({
  filterOptions,
  onSearchSubmit,
  filter,
  keyField,
  onParameterChange,
}) => {
  const handleChange = (option: any, checked: boolean) => {
    onParameterChange(`${option.name}`, checked)
  }
  const filterMui = keyField ? filter[keyField] : filter
  return (
    <form onSubmit={(event: React.FormEvent) => onSearchSubmit(event, filter)}>
      <FormGroup>
        {_.map(filterOptions, (option, index) => (
          <FormControlLabel
            key={`mul-select${index}`}
            control={
              <Checkbox
                checked={filterMui[option.name]}
                onChange={event => handleChange(option, event.target.checked)}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </form>
  )
}

export default ObservationSummaryGraph
