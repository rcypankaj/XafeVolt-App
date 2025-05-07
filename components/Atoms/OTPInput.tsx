import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import Colors from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Theme';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoFocus?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  error,
  autoFocus = false,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Initialize inputRefs array
    inputRefs.current = inputRefs.current.slice(0, length);
    
    // Auto focus on first input
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [length, autoFocus]);

  const handleChange = (text: string, index: number) => {
    // Ensure only numbers are entered
    if (!/^[0-9]?$/.test(text)) return;

    const newValue = value.split('');
    newValue[index] = text;
    const updatedValue = newValue.join('');
    onChange(updatedValue);

    // Move to next input if a digit was entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !value[index]) {
      // If current input is empty, focus previous input
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleContainerPress = () => {
    // Focus the first empty input or the last input
    for (let i = 0; i < length; i++) {
      if (!value[i]) {
        inputRefs.current[i]?.focus();
        return;
      }
    }
    inputRefs.current[length - 1]?.focus();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.inputsContainer}
        onPress={handleContainerPress}
      >
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.inputWrapper,
                focusedIndex === index && styles.inputWrapperFocused,
                error && styles.inputWrapperError,
              ]}
            >
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.input}
                keyboardType="numeric"
                value={value[index] || ''}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                maxLength={1}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                caretHidden
                selectTextOnFocus
              />
            </View>
          ))}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.m,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputWrapper: {
    width: 45,
    height: 48,
    borderRadius: BorderRadius.m,
    borderWidth: 1,
    borderColor: Colors.light.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapperFocused: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.background,
  },
  inputWrapperError: {
    borderColor: Colors.light.error,
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.light.text,
  },
  errorText: {
    fontSize: 14,
    color: Colors.light.error,
    marginTop: Spacing.xs,
  },
});

export default OTPInput;