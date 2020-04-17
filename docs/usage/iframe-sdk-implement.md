# Iframe-sdk Implement

## How to use iframe-sdk
  follow by [this link](../iframe-sdk/get-start.md)

## SetStructure iframe-sdk
example use with iframe-sdk when use `setStructure`. Important to send `widget name` that match in reducer in your widget
```html
<script>
    const widget2 = window.hmsWidgetAsyncInit(function(hmsWidget) {
       // ... init
        hmsWidget.setStructure({
          patientDemographic: { // widget name send it with camel case ex patientDemographic. it will tranfer to 'PATIENT_DEMOGRAPHIC' 
            nameField: false,
            ageField: false
          }
        });
      });
      // ... 
</script>
```
## OnMessage function in iframe-sdk
example use with iframe-sdk when use `onMessage`. `OnMessage` use listener `onMessage` in `window` object for read with `postMessage` from `hms-widget`. If you have yo use `window.onMessage` in your project. Please use `window.messageListenerService.addExtendMessagelistener` instead
```html
<script>
    const widget2 = window.hmsWidgetAsyncInit(function(hmsWidget) {
       // ... init
        hmsWidget.onMessage((data) => {
          if (data.message === 'handleEncounterSelect') {
            // data.params
          }
        })
      });
      // ... 

      window.messageListenerService.addExtendMessagelistener(() => {
        console.log("event CALL :");
      });
</script>
```
## Create new iframe-sdk function
You can create function for use call from html
1. register function in widget by use `MessageListenerService`
```ts
// component in hms-widget
   MessageListenerService.registerMessage('setTheme', (data: any) => {
        this.props.setTheme(data)
      })
    // registerMessage(functionName, callback)
```
2. In `iframe-sdk.js` create messageEvent object by use `createMessageEvents`. MessageEvent object can call event to widget by call functionName that set in `actions`. For prevent bug you need to call event after iframe loaded
```js
// iframe-sdk.js
    onIframeLoaded = iframeObject => {
      const actions = [
        "setTheme",
      ];
      const messageEvent = createMessageEvents(
        iframeObject.iframeElement,
        actions
      );
      if (iframeObject.theme) {
        messageEvent.setTheme(iframeObject.theme);
      }
  };
```