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
import FormInput from '@/components/Atoms/FormInput';
import Button from '@/components/Atoms/Button';
import Colors from '@/constants/Colors';
import { ChevronLeft } from 'lucide-react-native';
import ProgressBar from '@/components/Atoms/ProgressBar';
import { Spacing } from '@/constants/Theme';

const securityQuestions = [
  'What was the name of your first pet?',
  'In what city were you born?',
  "What is your mother's maiden name?",
  'What was your childhood nickname?',
];

export default function SecurityQuestionsScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(''));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep - 1] = text;
    setAnswers(newAnswers);
    if (error) setError('');
  };

  const handleNext = () => {
    if (!answers[currentStep - 1].trim()) {
      setError('Please provide an answer');
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to biometric setup
      router.push('/biometric-setup');
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
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Security Questions</Text>
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar
            currentStep={currentStep}
            totalSteps={4}
            labels={['Question 1', 'Question 2', 'Question 3', 'Question 4']}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            Set up security questions to help recover your account
          </Text>

          <Text style={styles.questionText}>
            {securityQuestions[currentStep - 1]}
          </Text>

          <FormInput
            label="Your Answer"
            placeholder="Enter your answer"
            value={answers[currentStep - 1]}
            onChangeText={handleAnswerChange}
            error={error}
            containerStyle={styles.inputContainer}
          />

          <Button
            title={currentStep < 4 ? 'Next' : 'Submit'}
            onPress={handleNext}
            loading={isLoading}
            disabled={!answers[currentStep - 1].trim()}
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
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 24,
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
  progressContainer: {
    marginBottom: 24,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.darkGray,
    marginBottom: 24,
    lineHeight: 22,
  },
  questionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 16,
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
});
