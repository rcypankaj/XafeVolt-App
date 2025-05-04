import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import PhoneInput from '@/components/Atoms/PhoneInput';
import Button from '@/components/Atoms/Button';
import Colors from '@/constants/Colors';
import { ChevronLeft } from 'lucide-react-native';
import { Spacing } from '@/constants/Theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (text: string, rawText: string) => {
    setPhoneNumber(rawText);
    if (error) setError('');
  };

  const handleSubmit = () => {
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store the phone number in auth context
      login(phoneNumber);
      // Navigate to OTP verification screen
      router.push({
        pathname: '/verify-otp',
        params: { mode: 'login', phone: phoneNumber },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Log in</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            Enter your phone number to receive a verification code
          </Text>

          <PhoneInput
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            error={error}
            containerStyle={styles.inputContainer}
          />

          <Button
            title="Continue"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={phoneNumber.length < 10}
            fullWidth
            style={styles.button}
          />

          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => router.push('/forgot-password')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => router.push('/signup')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
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
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.darkGray,
    marginBottom: 24,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 24,
  },
  forgotPasswordLink: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.primary,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: Spacing.m,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.darkGray,
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.light.primary,
  },
});
