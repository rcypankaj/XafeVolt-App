import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    if (disabled) {
      return styles.buttonDisabled;
    }

    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'outline':
        return styles.buttonOutline;
      case 'primary':
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    if (disabled) {
      return styles.textDisabled;
    }

    switch (variant) {
      case 'outline':
        return styles.textOutline;
      case 'secondary':
      case 'primary':
      default:
        return styles.textPrimary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;
      case 'large':
        return styles.buttonLarge;
      case 'medium':
      default:
        return styles.buttonMedium;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'large':
        return styles.textLarge;
      case 'medium':
      default:
        return styles.textMedium;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? Colors.light.primary : '#FFF'}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), getTextSizeStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: Colors.light.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.light.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  buttonDisabled: {
    backgroundColor: Colors.light.disabled,
  },
  buttonSmall: {
    paddingVertical: Spacing.s,
    paddingHorizontal: Spacing.m,
    minHeight: 40,
  },
  buttonMedium: {
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.l,
    minHeight: 48,
  },
  buttonLarge: {
    paddingVertical: Spacing.l,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  textPrimary: {
    color: '#FFF',
    fontWeight: '600',
  },
  textOutline: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  textDisabled: {
    color: '#FFF',
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;