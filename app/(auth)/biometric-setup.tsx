import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Atoms/Button';
import Colors from '@/constants/Colors';
import { ChevronLeft, Fingerprint } from 'lucide-react-native';
import useBiometricAuth from '@/hooks/useBiometricAuth';
import { Spacing } from '@/constants/Theme';

export default function BiometricSetupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAvailable, isEnrolled, biometricTypes, authenticate } =
    useBiometricAuth();
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleEnableBiometric = async () => {
    setIsLoading(true);

    if (Platform.OS === 'web') {
      // Web doesn't support biometrics, so we just simulate it
      setTimeout(() => {
        setIsLoading(false);
        setBiometricEnabled(true);
        Alert.alert(
          'Simulation',
          'Web platform does not support biometrics. This is a simulated success.',
          [{ text: 'OK' }],
        );
      }, 1000);
      return;
    }

    if (!isAvailable) {
      setIsLoading(false);
      Alert.alert(
        'Not Available',
        'Biometric authentication is not available on this device.',
        [{ text: 'OK' }],
      );
      return;
    }

    if (!isEnrolled) {
      setIsLoading(false);
      Alert.alert(
        'Not Enrolled',
        'No biometrics enrolled on this device. Please set up biometrics in your device settings.',
        [{ text: 'OK' }],
      );
      return;
    }

    try {
      const result = await authenticate('Enable biometric authentication');

      if (result.success) {
        setBiometricEnabled(true);
      } else {
        Alert.alert('Error', result.error || 'Authentication failed', [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during authentication.', [
        { text: 'OK' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    // Navigate to dashboard or additional setup steps
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    // Skip biometric setup and go to dashboard or next step
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Biometric Setup</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {Platform.OS === 'web' ? (
            <Fingerprint size={120} color={Colors.light.primary} />
          ) : (
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/6107761/pexels-photo-6107761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>

        <Text style={styles.heading}>
          {biometricEnabled ? 'Successfully Enabled!' : 'Add Extra Security'}
        </Text>

        <Text style={styles.description}>
          {biometricEnabled
            ? 'Biometric authentication has been successfully enabled for your account. You can now use your fingerprint or face to log in securely.'
            : 'Enable biometric authentication to add an extra layer of security to your account. This allows you to quickly and securely access your account using your fingerprint or face.'}
        </Text>

        {biometricEnabled ? (
          <Button
            title="Continue"
            onPress={handleContinue}
            fullWidth
            style={styles.button}
          />
        ) : (
          <>
            <Button
              title="Enable Biometric Authentication"
              onPress={handleEnableBiometric}
              loading={isLoading}
              fullWidth
              style={styles.button}
            />

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 32,
    color: Colors.light.text,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  heading: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.darkGray,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginBottom: 16,
  },
  skipButton: {
    paddingVertical: Spacing.m,
  },
  skipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.darkGray,
  },
});
