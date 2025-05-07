import { ExpoConfig, ConfigContext } from '@expo/config';

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */

module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugin = config.plugins ?? [];
  return {
    ...config,
    plugins: [
      ...existingPlugin,
      [
        'expo-local-authentication',
        {
          faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
        },
      ],
    ],
  };
};
