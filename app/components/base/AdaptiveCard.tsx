import React from 'react'

import * as AdaptiveCards from 'adaptivecards'
import * as ACFabric from 'adaptivecards-fabric'
import * as ACData from 'adaptivecards-templating'
import * as _ from 'lodash'
import MarkdownIt from 'markdown-it'

const md = MarkdownIt()

ACFabric.useFabricComponents()
AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text: any, result) => {
  result.outputHtml = md.render(text)
  result.didProcess = true
}

const AdaptiveCard: React.FunctionComponent<{
  templatePayload: any
  data: any
  onExecuteAction?: (action: AdaptiveCards.Action) => void
}> = ({ templatePayload, data, onExecuteAction }) => {
  const cardRef = React.useRef<null | HTMLDivElement>(null)
  let adaptiveCard = null

  // initial
  React.useEffect(() => {
    if (
      cardRef &&
      cardRef.current &&
      !_.isEmpty(templatePayload) &&
      !_.isEmpty(data)
    ) {
      console.info('initialize adaptive card...')
      adaptiveCard = initialize(cardRef, templatePayload, data)

      // register callback
      if (onExecuteAction) {
        adaptiveCard.onExecuteAction = onExecuteAction
      }
    }

    return () => {
      // componentDidUnmount
      adaptiveCard = null
      cardRef.current = null
    }
  }, [adaptiveCard, cardRef, templatePayload, data])

  return <div ref={cardRef}></div>
}

function initialize(cardRef: any, templatePayload: any, data: any) {
  // initialize card
  const adaptiveCard = new AdaptiveCards.AdaptiveCard()

  // Create a Template instamce from the template payload
  const template = new ACData.Template(templatePayload)

  // Create a data binding context, and set its $root property to the
  // data object to bind the template to
  const context = new ACData.EvaluationContext()
  context.$root = data
  // "Expand" the template - this generates the final Adaptive Card,
  // ready to render
  const card = template.expand(context)

  // Render the card
  adaptiveCard.parse(card)

  const view = adaptiveCard.render()

  cardRef.current.appendChild(view)

  return adaptiveCard
}

export default AdaptiveCard
