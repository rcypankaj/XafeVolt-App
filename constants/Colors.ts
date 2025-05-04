const tintColorLight = '#0A84FF';
const tintColorDark = '#0A84FF';

export type ColorTheme = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  border: string;
  notification: string;
  placeholder: string;
  disabled: string;
  darkGray: string;
};

export type ThemeColors = {
  light: ColorTheme;
  dark: ColorTheme;
};

const Colors: ThemeColors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorLight,
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    accent: '#FF9F0A',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    card: '#FFFFFF',
    border: '#E5E5EA',
    notification: '#FF3B30',
    placeholder: '#8E8E93',
    disabled: '#AEAEB2',
    darkGray: '#636366',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: tintColorDark,
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorDark,
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    accent: '#FF9F0A',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    card: '#1C1C1E',
    border: '#38383A',
    notification: '#FF453A',
    placeholder: '#8E8E93',
    disabled: '#636366',
    darkGray: '#8E8E93',
  },
};

export default Colors;
