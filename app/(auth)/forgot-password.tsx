import Button from '@/components/Atoms/Button';
import PhoneInput from '@/components/Atoms/PhoneInput';
import { ThemedText } from '@/components/ThemedText';
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

export default function ForgotPasswordScreen() {
  const { colors } = useTheme(); // Get dynamic theme colors
  const { updateUser } = useAuth();

  const [recoveryPhone, setRecoveryPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (text: string, rawText: string) => {
    setRecoveryPhone(rawText);
    if (error) setError('');
  };

  const handleSubmit = () => {
    if (recoveryPhone.length < 10) {
      setError('Please enter a valid recovery phone number');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store the recovery phone in auth context
      updateUser({ recoveryPhone });
      // Navigate to OTP verification screen
      router.push({
        pathname: '/verify-otp',
        params: { mode: 'forgot', phone: recoveryPhone },
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
            Forgot password
          </ThemedText>
        </View>

        <View style={styles.formContainer}>
          <ThemedText style={[styles.subtitle, { color: colors.darkGray }]}>
            Enter your recovery phone number to reset your password
          </ThemedText>

          <PhoneInput
            label="Recovery Phone Number"
            value={recoveryPhone}
            onChangeText={handlePhoneChange}
            error={error}
            containerStyle={styles.inputContainer}
            placeholder="Enter your recovery phone"
          />

          <Button
            title="Continue"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={recoveryPhone.length < 10}
            fullWidth
            style={styles.button}
          />

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/login')}
          >
            <ThemedText style={[styles.loginText, { color: colors.primary }]}>
              Back to Login
            </ThemedText>
          </TouchableOpacity>
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
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Inter-Medium',
  },
});
