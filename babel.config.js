
const pak = require('./package.json');
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver', { extensions: ['.tsx', '.ts', '.js', '.json'], },
      //'react-native-reanimated/plugin' // NOT HERE
    ],
    'react-native-reanimated/plugin' // PUT IT HERE
  ]
};


module.exports = function (api) {
  if (api.env("production")) {
    return {
      "presets": ["module:metro-react-native-babel-preset"],
      "plugins": [
        [
          'module-resolver', { extensions: ['.tsx', '.ts', '.js', '.json'], },
          //'react-native-reanimated/plugin' // NOT HERE
        ],
        "transform-remove-console",
        "react-native-reanimated/plugin"
      ]
    }
  }

  return {
    "presets": ["module:metro-react-native-babel-preset"],
    "plugins": [
      ['module-resolver', { extensions: ['.tsx', '.ts', '.js', '.json'], }],
      //"transform-remove-console",
      "react-native-reanimated/plugin",
    ]
  }
};