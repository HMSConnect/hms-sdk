# Demo app implement with iframe

Example code
```html
<html>
  <head> </head>

  <body>
    <div style="display: flex;">
      <div style="flex: 1;text-align: center;">
        <iframe
          src="https://hms-widget.bonmek.com/embedded-widget/patient-info/encounter-timeline/0debf275-d585-4897-a8eb-25726def1ed5?max=20&isRouteable=false"
          width="500"
          height="500"
        ></iframe>
      </div>
      <div style="flex: 1;text-align: center;">
        <iframe
          id="demographicSummary"
          src="https://hms-widget.bonmek.com/embedded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5/encounter/3898f0f9-385e-478d-be25-5f05719e80af/demographic-summary"
          width="640"
          height="500"
        ></iframe>
      </div>
    </div>
  </body>

  <script>
    window.addEventListener('message', function(event) {
      if (event.data.message == 'handleEncounterSelect') {
        const iframeElement = document.getElementById('demographicSummary')
        iframeElement.setAttribute(
          'src',
          `https://hms-widget.bonmek.com/embedded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5/encounter/${event.data.params.encounterId}/demographic-summary`,
        )
      }
    })
  </script>
</html>
```
Description code
1. If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)
2. If user iteract with HMS-widget it will post message throug window message listener. User can use that event to interact with another HMS-widget by change src attribute in `<iframe>` tag