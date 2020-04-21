# Route Hms-widget
`routes` responsible for navigate to widget widget by seperate `demo` and `embedded-widget`. 

**Reference RouteManager**

IRouteOption
- properties

| name | type              | description                                                           |
| ---- | ----------------- | --------------------------------------------------------------------- |
| mode | 'full' , 'widget' | Mode of using widget, if `widget` path will include `embedded-widget` |

- method

| name         | parameters                                 | description                                                                         |
| ------------ | ------------------------------------------ | ----------------------------------------------------------------------------------- |
| registryMode | (pathName: string)                         | Set mode property by check pathname                                                 |
| getPath      | (path: string, options: IRouteOption = {}) | Get path real path. If mode is `widget`, it will include `/embedded-widget`, in url |