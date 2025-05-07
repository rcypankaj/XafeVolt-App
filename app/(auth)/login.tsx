import Button from '@/components/Atoms/Button';
import PhoneInput from '@/components/Atoms/PhoneInput';
import { ThemedText } from '@/components/ThemedText';
import { Spacing } from '@/constants/Theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme(); // Get dynamic theme colors
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

    setTimeout(() => {
      setIsLoading(false);
      login(phoneNumber);
      router.push({
        pathname: '/verify-otp',
        params: { mode: 'login', phone: phoneNumber },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.border }]}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <ThemedText
            style={[styles.title, { color: colors.text }]}
            type="title"
          >
            Log in
          </ThemedText>
        </View>

        <View style={styles.formContainer}>
          <ThemedText style={[styles.subtitle, { color: colors.darkGray }]}>
            Enter your phone number to receive a verification code
          </ThemedText>

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
            <ThemedText
              style={[styles.forgotPasswordText, { color: colors.primary }]}
            >
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.darkGray }]}>
            Don't have an account?{' '}
            <ThemedText
              style={[styles.signupLink, { color: colors.primary }]}
              onPress={() => router.push('/signup')}
            >
              Sign up
            </ThemedText>
          </ThemedText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
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
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: Spacing.m,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
  },
});
