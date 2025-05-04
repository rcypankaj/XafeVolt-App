import Button from '@/components/Atoms/Button';
import FormInput from '@/components/Atoms/FormInput';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
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

export default function SignupScreen() {
  const { colors } = useTheme(); // Get dynamic theme colors
  const { updateUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({ firstName: '', lastName: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { firstName: '', lastName: '' };

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store the user data in auth context
      updateUser({ firstName, lastName });
      // Navigate to phone number input screen
      router.push('/login');
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
            Create account
          </ThemedText>
        </View>

        <View style={styles.formContainer}>
          <ThemedText style={[styles.subtitle, { color: colors.darkGray }]}>
            Let's start with your name
          </ThemedText>

          <FormInput
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
            containerStyle={styles.inputContainer}
            autoCapitalize="words"
          />

          <FormInput
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
            containerStyle={styles.inputContainer}
            autoCapitalize="words"
          />

          <Button
            title="Continue"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={!firstName.trim() || !lastName.trim()}
            fullWidth
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.darkGray }]}>
            Already have an account?{' '}
            <ThemedText
              style={[styles.loginLink, { color: colors.primary }]}
              onPress={() => router.push('/login')}
            >
              Log in
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
    fontSize: 32,
    color: Colors.light.text,
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
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: Spacing.m,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
  },
  loginLink: {
    fontFamily: 'Inter-SemiBold',
  },
});
