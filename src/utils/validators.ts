export const customValidators = {
  isString: function (value: any) {
    return typeof value === 'string' || value instanceof String;
  },
  isArray: function (value: any) {
    return Array.isArray(value);
  },
  isNotEmpty: function (array: any) {
    return array.length > 0;
  },
  isObject: function (val: any) {
    return val instanceof Object;
  },
  isObjectEmpty: function (val: any) {
    if (val instanceof Object) {
      return Object.entries(val).length === 0;
    }
  },
};
