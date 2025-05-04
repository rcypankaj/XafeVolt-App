import Button from '@/components/Atoms/Button';
import OTPInput from '@/components/Atoms/OTPInput';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function VerifyOTPScreen() {
  const { colors } = useTheme();
  const { updateUser, setToken } = useAuth();
  const params = useLocalSearchParams<{ mode: string; phone: string }>();
  const mode = params.mode || 'login';
  const phoneNumber = params.phone || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setTimeLeft(30);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    return `${seconds.toString().padStart(2, '0')}`;
  };

  const handleResendCode = () => {
    if (timeLeft === 0) {
      // Simulate API call for resending OTP
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        startTimer();
        Alert.alert('Success', 'A new verification code has been sent.');
      }, 1000);
    }
  };

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);

    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, any 6-digit code is accepted
      if (otp.length === 6) {
        // Generate a mock token
        const mockToken = `auth-token-${Math.random().toString(36).substring(2, 15)}`;

        // Store the token
        setToken(mockToken);

        // Route based on mode
        if (mode === 'login') {
          router.push('/biometric-setup');
        } else if (mode === 'signup') {
          router.push({
            pathname: '/signup/recovery-phone',
            params: { phone: phoneNumber },
          });
        } else if (mode === 'forgot') {
          router.push('/answer-questions');
        }
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }, 1500);
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
          <ThemedText style={{ color: colors.text }} type="title">
            Verification code
          </ThemedText>
        </View>

        <View style={styles.formContainer}>
          <ThemedText style={[styles.subtitle, { color: colors.darkGray }]}>
            Enter the 6-digit code sent to {phoneNumber}
          </ThemedText>

          <OTPInput
            length={6}
            value={otp}
            onChange={value => {
              setOtp(value);
              if (error) setError('');
            }}
            error={error}
            autoFocus
          />

          <View style={styles.timerContainer}>
            <ThemedText style={[styles.timerText, { color: colors.darkGray }]}>
              {timeLeft > 0
                ? `Resend code in ${formatTime(timeLeft)}s`
                : "Didn't receive the code?"}
            </ThemedText>

            {timeLeft === 0 && (
              <TouchableOpacity onPress={handleResendCode}>
                <ThemedText
                  style={[styles.resendLink, { color: colors.primary }]}
                >
                  Resend Code
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>

          <Button
            title="Verify"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={otp.length !== 6}
            fullWidth
            style={styles.button}
          />
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
  subtitle: {
    fontFamily: 'Inter-Regular',
    marginBottom: 32,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  resendLink: {
    fontFamily: 'Inter-SemiBold',
  },
  button: {
    marginBottom: 24,
  },
});
