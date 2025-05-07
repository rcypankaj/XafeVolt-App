import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { authState } = useAuth();
  const user = authState.user;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.background,
      }}
    >
      <Dashboard />
    </SafeAreaView>
  );
}
