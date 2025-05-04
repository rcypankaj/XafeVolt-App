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

export default function ForgotPasswordScreen() {
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
          <Text style={styles.title}>Forgot password</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            Enter your recovery phone number to reset your password
          </Text>

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
            <Text style={styles.loginText}>Back to Login</Text>
          </TouchableOpacity>
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
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.light.primary,
  },
});
