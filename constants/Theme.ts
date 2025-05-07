import { StyleSheet } from 'react-native';
import Colors from './Colors';

// Common styles that can be reused across the app
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginVertical: 16,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  textSmall: {
    fontSize: 14,
    color: Colors.light.darkGray,
    lineHeight: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    padding: 16,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 12,
    padding: 16,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutlineText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: Colors.light.disabled,
    borderRadius: 12,
    padding: 16,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.light.text,
    marginVertical: 8,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.light.error,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    marginTop: 4,
  },
  link: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 16,
  },
});

// Typography styles
export const Typography = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  body: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: Colors.light.darkGray,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.background,
  },
});

// Spacing constants
export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

// Border radius constants
export const BorderRadius = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  round: 9999,
};
