import postcss from 'rollup-plugin-postcss'
import NpmImport from 'less-plugin-npm-import'
import config from '../../config/rollup-config'

export default config({
  input: './src/index.tsx',
  output: [
    {
      name: 'XFlowCore',
      format: 'umd',
      file: 'dist/index.umd.js',
      sourcemap: true,
      globals: {
        antd: 'antd',
        react: 'React',
        lodash: 'lodash',
        'react-dom': 'ReactDOM',
        '@digiforce-cloud/x6': 'X6',
        '@digiforce-cloud/x6-react-shape': 'X6ReactShape',
        '@digiforce-cloud/x6-react-components': 'X6ReactComponents',
        '@antv/layout': 'layout',
      },
    },
  ],
  external: [
    'antd',
    'react',
    'lodash',
    'react-dom',
    '@digiforce-cloud/x6',
    '@digiforce-cloud/x6-react-shape',
    '@digiforce-cloud/x6-react-components',
    '@antv/layout',
  ],
  plugins: [
    postcss({
      minimize: true,
      sourceMap: false,
      extensions: ['.less', '.css'],
      use: [['less', { javascriptEnabled: true, plugins: [new NpmImport({ prefix: '~' })] }]],
    }),
  ],
})
