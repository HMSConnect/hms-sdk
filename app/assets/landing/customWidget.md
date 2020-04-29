```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@3528ecc5679e6c32090094d21bfb3fddea767583/sdk/iframe-sdk.min.js"
    ></script>
  </head>
  <body>
    <div id="widget-example1"></div>
    ​
    <script>
      const widget1 = window.hmsWidgetAsyncInit(function (hmsWidget) {
        hmsWidget.init({
          selector: "widget-example1",
          widgetPath: "patient-info/patient-demographic",
          width: "700px",
          height: "400px",
          href: 'http://localhost:3000',
          pathPrefix: "embedded-widget",
        });
        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
        });
        hmsWidget.setCustomizeTheme(
          {
            palette: {
              background: {
                paper: "#ffc071",
              },
              text: {
                primary: '#4d4d4d',
                secondary: '#000000',
              }
            },
          },
          "invert"
        );
        hmsWidget.setStructure({
          patientDemographic: {
            ageField: false
          }
        })
      });
    </script>
  </body>
</html>

```