# Getting started with HMS Widget Iframe SDK

# **How to use widget with iframe with**

1. Add javascript to your html file by use tag `<script>` with src `https://hms-widget.bonmek.com/`

```html
<script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@c38fdc73b2cfa7cd7a581a678f8aceedd0a510f3/sdk/iframe-sdk.min.js"
></script>
```

**Reference Iframe-API**
- referance iframe-api

| api name          | type/format                                                           | description                   |
| ----------------- | --------------------------------------------------------------------- | ----------------------------- |
| init              | IInitObject                                                           | Initial for create iframe     |
| setParams         | any                                                                   | params for selected widget    |
| setTheme          | `normal`, `dark`, `invert`                                            | theme for render              |
| setCustomizeTheme | [ThemeOptions](https://v4-8-3.material-ui.com/customization/theming/) | Name of widget for emit event |


**Interfaces**
- IInitObject

| key         | type/format | default                       | description                                      |
| ----------- | ----------- | ----------------------------- | ------------------------------------------------ |
| *selector   | string      | -                             | div element id for create iframe                 |
| *widgetPath | string      | -                             | path for render widget from `href`               |
| width       | string      | 300px                         | width of iframe                                  |
| height      | string      | 300px                         | height of iframe                                 |
| href        | string      | https://hms-widget.bonmek.com | href for point to server that serve widget       |
| pathPrefix  | string      | embedded-widget               | pathPrefix for point to server that serve widget |


2 Add script to initialize iframe-sdk 
```html
<script>
    window.hmsWidgetAsyncInit(function(hmsWidget) {
            hmsWidget.init({
            selector: "widget-example",
            widgetPath: "patient-summary",
            width: "1600px",
            height: "1080px",
            href: "http://localhost:3000",
            pathPrefix: "embedded-widget"
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
    });
</script>
```


Global Query Param 
| key  | type/format | description                   |
| ---- | ----------- | ----------------------------- |
| name | string      | Name of widget for emit event |

1. (Optional if you want to listen event from widget) Apply `eventListener` with `message` type to your `<script>`

```html
<script>
  window.addEventListener("message", function(event) {
    if (event.origin !== "https://hms-widget.bonmek.com") return;
    if(event.data.eventType !== 'embedded-widget') return

    console.log("message received:  ", event.data.message);
    console.log("action received:  ", event.data.action);
    console.log("params received:  ", event.data.params);
    console.log("path received:  ", event.data.path);
    console.log("eventType received:  ", event.data.eventType);
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

4. Finally, your html source code will be

```html
<!DOCTYPE html>
<html>
  <head>
    <script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@c38fdc73b2cfa7cd7a581a678f8aceedd0a510f3/sdk/iframe-sdk.min.js"
></script>
  </head>
  <body>
    <div id="widget-example">
      --- iframe rendered here ---
      <br />
    </div>
    ​ ​
    <script>
      window.addEventListener("message", function(event) {
        if (event.origin !== "https://hms-widget.bonmek.com") return;
        if (event.data.eventType !== "embedded-widget") return;

        console.log("message received:  ", event.data.message);
        console.log("action received:  ", event.data.action);
        console.log("params received:  ", event.data.params);
        console.log("path received:  ", event.data.path);
        console.log("eventType received:  ", event.data.eventType);
      });
    </script>
    <script>
      window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: "widget-example",
          widgetPath: "patient-summary",
          width: "1600px",
          height: "1080px",
          href: "http://localhost:3000",
          pathPrefix: "embedded-widget"
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
      });
    </script>
  </body>
</html>
```
