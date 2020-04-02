# Getting started with HMS Widget Iframe SDK

# **How to use widget with iframe with**

1. Add javascript to your html file by use tag `<script>` with src `https://hms-widget.bonmek.com/`

```html
<script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@dc3e3e48c674fcba470524d6e91ab69116223a67/sdk/iframe-sdk.min.js"
></script>
```

**Reference Iframe-API**
- hmsWidget api

| api name          | type/format                                                           | description                                      |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| init              | IInitObject                                                           | Initial for create iframe                        |
| setParams         | any                                                                   | params for selected widget                       |
| setTheme          | `normal`, `dark`, `invert`                                            | theme for render                                 |
| setCustomizeTheme | [ThemeOptions](https://v4-8-3.material-ui.com/customization/theming/) | Name of widget for emit event                    |
| onMessage         | function                                                              | Function callback when iframe got event response |


- window.messageListenerService api

| api name                 | type/format | description                                          |
| ------------------------ | ----------- | ---------------------------------------------------- |
| addExtendMessagelistener | function    | Function call when window.eventmessage has been call |

**Interfaces**
- IInitObject

| key        | require | type/format | default                       | description                                      |
| ---------- | ------- | ----------- | ----------------------------- | ------------------------------------------------ |
| selector   | true    | string      | -                             | div element id for create iframe                 |
| widgetPath | true    | string      | -                             | path for render widget from `href`               |
| width      | false   | string      | 300px                         | width of iframe                                  |
| height     | false   | string      | 300px                         | height of iframe                                 |
| href       | false   | string      | https://hms-widget.bonmek.com | href for point to server that serve widget       |
| pathPrefix | false   | string      | embedded-widget               | pathPrefix for point to server that serve widget |


2. Add script to initialize iframe-sdk by use `window.hmsWidgetAsyncInit`. it receive callback function and will call when ready
```html
<script>
    window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
            selector: "widget-example",
            widgetPath: "patient-summary",
            width: "1600px",
            height: "1080px",
        });

        hmsWidget.setParams(
            {
                patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
                encounterId: "3898f0f9-385e-478d-be25-5f05719e80af"
            },
            "widgetName"
        );

        hmsWidget.setTheme("dark"); // select theme: 'normal', 'dark', 'invert'
        hmsWidget.setCustomizeTheme({
            palette: {
                primary: { main: "#03a9f4" },
                secondary: { main: "#00bfa5" },
                quinary: { main: "#ffffff" }
            }
        });
        hmsWidget.onMessage(data => {
            console.log('data :', data);
        });
    });
</script>
```

object response 
  | key       | type/format     | description                                                          |
  | --------- | --------------- | -------------------------------------------------------------------- |
  | eventType | embedded-widget | Event type to identify that event is called from our embedded-widget |
  | name      | string          | Name of widget such as `patientDemographic`                          |
  | message   | string          | Name of event such as `handleSelectPatient`                          |
  | params    | string          | Parameters is send from widget iframe  as `{patientId: '000001'}`    |
  | path      | string          | Next path that widget will navigate such as `patient-info`           |
  | result    | object          | Result of loading                                                    |
  | action    | object          | Action to `window.router` such as `REPLACE_ROUTE`                    |


3. Finally, your html source code will be

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@befa56d14ee566e7c3e92244e4c585c336a76dda/sdk/iframe-sdk.min.js"
    ></script>
  </head>
  <body>
    <div id="widget-example1">
      --- iframe rendered here 1 ---
      <br />
    </div>
    <div id="widget-example2">
      --- iframe rendered here 2 ---
      <br />
    </div>
    <div id="widget-example3">
      --- iframe rendered here 3 ---
      <br />
    </div>
    <script>
      window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: "widget-example1",
          widgetPath: "patient-summary",
          width: "1200px",
          height: "720px",
        });
        hmsWidget.setTheme("dark");
        hmsWidget.setParams(
          {
            patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
            encounterId: "3898f0f9-385e-478d-be25-5f05719e80af"
          },
          "widgetName"
        );
        hmsWidget.setCustomizeTheme({
          typography: {
            h4: {
              fontSize: "3.5rem",
              color: "blue"
            },
            body2: {
              fontSize: "1rem",
              color: "red"
            }
          },
          palette: {
            primary: { main: "#03a9f4" },
            secondary: { main: "#00bfa5" },
            quinary: { main: "#ffffff" }
          }
        });
      });

      window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: "widget-example2",
          widgetPath: "patient-search-bar",
          width: "500px",
          height: "400px",
        });

        hmsWidget.setParams(
          {
            max: 10,
            offset: 0,
            page: 0,
            filter: {
              gender: "male"
            }
          },
          "widgetName"
        );
        hmsWidget.setTheme("invert");
        hmsWidget.setCustomizeTheme({
          typography: {
            h4: {
              fontSize: "3.5rem",
              color: "blue"
            },
            body2: {
              fontSize: "1rem",
              color: "red"
            }
          },
          palette: {
            primary: { main: "#03a9f4" },
            secondary: { main: "#00bfa5" },
            quinary: { main: "#ffffff" }
          }
        });

        hmsWidget.onMessage(() => {
          console.log("test widget 2 :");
        });
      });

      window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: "widget-example3",
          widgetPath: "patient-search-bar",
          width: "500px",
          height: "400px",
        });

        hmsWidget.setParams({
          max: 10,
          offset: 0,
          page: 0,
          filter: {
            gender: "male"
          }
        });

        hmsWidget.onMessage(data => {
          console.log('data :', data);
          console.log("test widget 3 :");
        });
      });

      window.messageListenerService.addExtendMessagelistener(() => {
        console.log("event CALl :");
      });
    </script>
  </body>
</html>
```
