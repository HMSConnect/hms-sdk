import React from 'react'
import { IStatelessPage } from '../../patient-search'

const EncounterTestView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return <>EncounterTestView</>
}

EncounterTestView.getInitialProps = async ({ req, res, query }) => {
  console.log('query :', query)
  return {
    query
  }
}

export default EncounterTestView
