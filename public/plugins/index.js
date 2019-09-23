const BASE_WIDTH = '375px';
const convert = (size) => {
  return typeof size === 'string' ? +size.replace('px', '') : size ;
}

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('vw', function (s) {
      const result = convert(s.value) / convert(BASE_WIDTH) * 100
      return result + 'vw';
    });
  }
};
