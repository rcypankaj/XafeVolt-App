/* eslint-env node */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get default Expo config
const config = getDefaultConfig(__dirname);

// Add SVG support
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

// Apply NativeWind config
module.exports = withNativeWind(config, { input: "./global.css" });
