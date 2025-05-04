import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Colors from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Theme';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string, rawText: string) => void;
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  label = 'Phone Number',
  error,
  containerStyle,
  placeholder = 'Enter your phone number',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.countryCode}>
          <Text style={styles.countryCodeText}>+1</Text>
        </View>
        <MaskedTextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
          ]}
          mask="(999) 999-9999"
          placeholder={placeholder}
          placeholderTextColor={Colors.light.placeholder}
          keyboardType="numeric"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.m,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.m,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRightWidth: 0,
    borderTopLeftRadius: BorderRadius.m,
    borderBottomLeftRadius: BorderRadius.m,
    backgroundColor: Colors.light.background,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderTopRightRadius: BorderRadius.m,
    borderBottomRightRadius: BorderRadius.m,
    paddingHorizontal: Spacing.m,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.background,
  },
  inputFocused: {
    borderColor: Colors.light.primary,
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  errorText: {
    fontSize: 14,
    color: Colors.light.error,
    marginTop: Spacing.xs,
  },
});

export default PhoneInput;
