export default {
  cjs: 'babel',
  esm: 'babel',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@digiforce-cloud/x6-react-components',
        libraryDirectory: 'es',
        transformToDefaultImport: false,
        style: true,
      },
      '@digiforce-cloud/x6-react-components',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        transformToDefaultImport: true,
        camel2DashComponentName: false,
      },
      'lodash',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
}
