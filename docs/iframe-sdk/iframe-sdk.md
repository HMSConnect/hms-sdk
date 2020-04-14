# Iframe SDK 

iframe-sdk is a sdk that help use widget from hms-widget easily. It expose a simplt function for config widget 

Installation
``` html
<script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@eb2f898e993bbbf30e2fa54593dab266e37045ee/sdk/iframe-sdk.min.js"
></script>
```

## Create Widget
HMS use nextjs to serve file so our process for create new widget same as create page for nextjs.
1. create new widget in `pages/embedded-widget` folder
2. widget need to add `getInitialProps` for get query string from user 
```ts
    const <NewWidget>: IStatelessPage<{
    query: any
    }> = ({ query }) => {
    // ... Component defination
    }
    <NewWidget>.getInitialProps = ({
        req,
        res,
        query,
    }) => {
        return {
            query: parse(query),
        }
    }
```
3. for next step after create widget is craete route to access widget in `routes.js`

```js
    .add(
        'embedded-widget/patient-summary', // name widget
        '/embedded-widget/patient-summary', // path for access by url and acces by iframe-sdk
        'embedded-widget/patient-info/patient-summary', // widget's location
    )
```

## Add setStructure function in widget
For control display section in widget we provide `setStructure` function to use for setup structure in redux.

```ts
    export const patientDemographicInitialState: any = {
        structure: {
            addressField: true,
            ageField: true,
            dobField: true,
            emailField: true,
            genderField: true,
            iconField: true,
            languageField: true,
            nameField: true,
            phoneField: true,
        },
    }
    const patientDemographic = (
    state = patientDemographicInitialState,
    action: IPatientDemographicAction,
    ) => {
        switch (action.type) {
           // ...
            case 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC': // Type start with 'SET_STRUCTURE_' always
                return {
                    ...state,
                    structure: {
                        ...state.structure,
                        ...action.payload,
                    },
                }
            // ...
        }
    }

    export default patientDemographic
```
And in widget you need to read value from redux store and set logic for display by yourself

## Create function iframe-sdk
You can create function for use in iframe-sdk
1. register function in widget by use `MessageListenerService`

```js
    MessageListenerService.registerMessage('finishIframeLoading', data => {
        this.setState({
          ...this.state,
          loading: false,
        })
    })
    // registerMessage(widgetName, callback)
```
2. register function in sdk by 
```js
    const actions = [ // for add function's name
        "finishIframeLoading",
    ];
    const messageEvent = createMessageEvents(
        iframeObject.iframeElement,
        actions
    );
    messageEvent.finishIframeLoading();
```




## Add Theme
For theme, hms-widget use `material-ui` for style and theme provider. you can set theme by follow
1. Create new theme file name in `styles` folder by use `createMuiTheme` function from `material-ui`
2. (Optional) If you want your theme to default config you can config by use `ThemeManager.setDefaultTheme` in `ThemeLayout` by send `name of file theme`