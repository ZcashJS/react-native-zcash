'use strict'

const path = require("path");
const getConfig = require("metro-bundler-config-yarn-workspaces");
const options = {
  nodeModules: path.resolve(__dirname, "..", ".."),
};
const macOptions = {
  getProvidesModuleNodeModules: () => ['react-native-macos'],
  getPlatforms: () => 'macos',
}
module.exports = Object.assign({}, getConfig(__dirname, options), macOptions)

// This is want react-native-macos init gave me but would npt find workspaces.
// module.exports = {
//   getProvidesModuleNodeModules: () => ['react-native-macos'],
//   getPlatforms: () => 'macos',
// }
