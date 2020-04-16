# Iframe-sdk Implement

## How to use iframe-sdk
  follow by [this link](../iframe-sdk/get-start.md)

## Create new iframe-sdk function
You can create function for use call from html
1. register function in widget by use `MessageListenerService`
```js
   MessageListenerService.registerMessage('setTheme', (data: any) => {
        this.props.setTheme(data)
      })
    // registerMessage(functionName, callback)
```
2. In `iframe-sdk.js` create messageEvent object by use `createMessageEvents`. MessageEvent object can call event to widget by call functionName that set in `actions`. For prevent bug you need to call event after iframe loaded
```js
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