import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Colors from '@/constants/Colors';
import { Eye, EyeOff } from 'lucide-react-native';
import { BorderRadius, Spacing } from '@/constants/Theme';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  rightIcon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  containerStyle,
  isPassword = false,
  rightIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
          ]}
          placeholderTextColor={Colors.light.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !passwordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeOff size={24} color={Colors.light.darkGray} />
            ) : (
              <Eye size={24} color={Colors.light.darkGray} />
            )}
          </TouchableOpacity>
        )}
        {rightIcon && <View style={styles.iconButton}>{rightIcon}</View>}
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.m,
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
  iconButton: {
    position: 'absolute',
    right: Spacing.m,
    height: '100%',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 14,
    color: Colors.light.error,
    marginTop: Spacing.xs,
  },
});

export default FormInput;