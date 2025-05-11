const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Apply NativeWind config (modifies in place)
withNativeWind(config, { input: './global.css' });

// Add SVG support
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// ✅ Add assetPlugins required for EAS build to work correctly
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = config;
