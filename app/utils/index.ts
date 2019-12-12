import * as _ from 'lodash'

export function toNaturalName(s: string) {
  return _.chain(s)
    .words()
    .map(v => _.capitalize(v))
    .join(' ')
    .value()
}
