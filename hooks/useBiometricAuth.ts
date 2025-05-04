import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

type BiometricTypes = {
  fingerprint: boolean;
  facialRecognition: boolean;
  irisRecognition: boolean;
};

export default function useBiometricAuth() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometricTypes, setBiometricTypes] = useState<BiometricTypes>({
    fingerprint: false,
    facialRecognition: false,
    irisRecognition: false,
  });
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if biometric authentication is available on the device
  useEffect(() => {
    const checkBiometricAvailability = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Skip biometric check on web platform
        if (Platform.OS === 'web') {
          setIsAvailable(false);
          setIsLoading(false);
          return;
        }

        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsAvailable(compatible);

        if (compatible) {
          // Get available biometric types
          const types =
            await LocalAuthentication.supportedAuthenticationTypesAsync();

          setBiometricTypes({
            fingerprint: types.includes(
              LocalAuthentication.AuthenticationType.FINGERPRINT,
            ),
            facialRecognition: types.includes(
              LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
            ),
            irisRecognition: types.includes(
              LocalAuthentication.AuthenticationType.IRIS,
            ),
          });

          // Check if user has enrolled biometrics
          const enrolled = await LocalAuthentication.isEnrolledAsync();
          setIsEnrolled(enrolled);
        }
      } catch (err) {
        console.error('Error checking biometric availability:', err);
        setError('Failed to check biometric availability');
      } finally {
        setIsLoading(false);
      }
    };

    checkBiometricAvailability();
  }, []);

  // Function to authenticate user with biometrics
  const authenticate = async (promptMessage = 'Authenticate to continue') => {
    try {
      setError(null);

      // Skip on web
      if (Platform.OS === 'web') {
        return {
          success: false,
          error: 'Biometric authentication not available on web',
        };
      }

      if (!isAvailable) {
        return { success: false, error: 'Biometric hardware not available' };
      }

      if (!isEnrolled) {
        return {
          success: false,
          error: 'No biometrics enrolled on this device',
        };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use passcode',
      });

      if (result.success) {
        return { success: true };
      } else {
        return {
          success: false,
          error: result.error
            ? 'Authentication failed'
            : 'Authentication cancelled',
        };
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Authentication failed');
      return { success: false, error: 'Authentication error occurred' };
    }
  };

  return {
    isAvailable,
    isEnrolled,
    biometricTypes,
    authenticate,
    error,
    isLoading,
  };
}
