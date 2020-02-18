import * as React from 'react'
import { AppContext } from '@app/reducers/appContext.reducer'
import ObservationBodyWeightGraph from './ObservationBodyWeightGraph'
import ObservationBloodPressureGraph from './ObservationBloodPressureGraph'
import * as _ from 'lodash'
import ObservationBodyHeightGraph from './ObservationBodyHeightGraph'

const ObservaionHistoryGraph: React.FunctionComponent<any> = ({ query }) => {
    const context: any = React.useContext(AppContext)
    const [Component, setComponent] = React.useState<any>(<EmptyComponent />)

    React.useEffect(() => {
        setComponent(renderGraph(_.get(context, 'DEMOGRAPHIC_SUMMARY_WIDGET.selectedCard') || _.get(query, 'selectedCard')))
    }, [query, context.DEMOGRAPHIC_SUMMARY_WIDGET])

    const renderGraph = (selected: string) => {
        switch (selected) {
            case 'BODY_MEASUREMENT':
                return (<ObservationBodyWeightGraph query={query} />)
            case 'BODY_HEIGHT':
                return (<ObservationBodyHeightGraph query={query} />)
            case 'BODY_WEIGHT':
                return (<ObservationBodyWeightGraph query={query} />)
            case 'BLOOD_PRESSURE':
                return (<ObservationBloodPressureGraph query={query} />)
            default: return (<EmptyComponent />)
        }
    }
    return <>
        <div style={{ height: '100%' }}>
            {/* {renderGraph(_.get(context, 'DEMOGRAPHIC_SUMMARY_WIDGET.selectedCard') || _.get(query, 'selectedCard'))} */}
            {Component}
        </div>
    </>
}

export default ObservaionHistoryGraph

const EmptyComponent: React.FunctionComponent<any> = () => {
    return <>Empty</>
}

