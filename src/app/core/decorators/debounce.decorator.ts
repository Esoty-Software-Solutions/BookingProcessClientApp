import * as _ from 'lodash';
export function debounce(delay: number = 300): any {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = _.debounce(original, delay);
    return descriptor;
  };
}
