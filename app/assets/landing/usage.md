```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document</title>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@3528ecc5679e6c32090094d21bfb3fddea767583/sdk/iframe-sdk.min.js"
    ></script>
  </head>
  <body>
    <div id="widget-example1">
      --- iframe rendered here 1 ---
      <br />
    </div>
​
    <script>
      const widget1 = window.hmsWidgetAsyncInit(function (hmsWidget) {
        hmsWidget.init({
          selector: "widget-example1",
          widgetPath: "patient-info/patient-demographic",
        });
        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
        });
      });
    </script>
  </body>
</html>
```