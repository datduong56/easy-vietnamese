module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigators': './src/navigators',
          '@i18n': './src/i18n',
          '@stores': './src/stores',
          '@services': './src/services',
          '@core': './src/core',
          '@const': './src/const',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
