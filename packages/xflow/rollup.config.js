import postcss from 'rollup-plugin-postcss'
import NpmImport from 'less-plugin-npm-import'
import config from '../../config/rollup-config'

export default config({
  input: './src/index.tsx',
  output: [
    {
      name: 'XFlow',
      format: 'umd',
      file: 'dist/index.umd.js',
      sourcemap: true,
      globals: {
        antd: 'antd',
        react: 'React',
        lodash: 'lodash',
        'react-dom': 'ReactDOM',
        // '@antv/layout': 'layout',
        // '@digiforce-cloud/x6': 'X6',
        // '@digiforce-cloud/x6-react-shape': 'X6ReactShape',
        // '@digiforce-cloud/x6-react-components': 'X6ReactComponents',
      },
    },
  ],
  external: [
    'antd',
    'react',
    'lodash',
    'react-dom',
    // '@antv/layout',
    // '@digiforce-cloud/x6',
    // '@digiforce-cloud/x6-react-shape',
    // '@digiforce-cloud/x6-react-components',
  ],
  plugins: [
    postcss({
      minimize: true,
      sourceMap: false,
      extensions: ['.less', '.css'],
      use: [
        [
          'less',
          {
            plugins: [new NpmImport({ prefix: '~' })],
            javascriptEnabled: true,
          },
        ],
      ],
    }),
  ],
})
