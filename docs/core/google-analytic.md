# Google Analytic Hms-widget
`GoogleAnalyticsFactory` responsible for google-analytic api. 

**Reference GoogleAnalyticsFactory**

IRouteOption
- method

| name               | parameters                                               | description                             |
| ------------------ | -------------------------------------------------------- | --------------------------------------- |
| initializeGoogleGA | (options?: any)                                          | Initialize GA by read key from env.file |
| setReactGA         | (fieldsObject: FieldsObject, trackNames?: any)           | To setup GA object                      |
| trackPage          | (page: string, options?: FieldsObject, trackNames?: any) | To use GA trackpage                     |
| createEvent        | (eventObject: IGAEvent)                                  | To use GA createEvent                   |