import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Bell,
  ChevronRight,
  CircleHelp as HelpCircle,
  Lock,
  LogOut,
  Moon,
  Settings as SettingsIcon,
  Shield,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const { theme, colors, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>
          Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Account
          </Text>

          <SettingsMenuItem
            icon={<Lock size={24} color={colors.primary} />}
            title="Security Settings"
            onPress={() => {}}
            colors={colors}
          />

          <SettingsMenuItem
            icon={<Bell size={24} color={colors.primary} />}
            title="Notifications"
            colors={colors}
            right={
              <Switch
                trackColor={{
                  false: colors.border,
                  true: 'rgba(10, 132, 255, 0.4)',
                }}
                thumbColor={notificationsEnabled ? colors.primary : '#f4f3f4'}
                ios_backgroundColor={colors.border}
                onValueChange={setNotificationsEnabled}
                value={notificationsEnabled}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Privacy & Security
          </Text>

          <SettingsMenuItem
            icon={<Shield size={24} color={colors.primary} />}
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security"
            onPress={() => {}}
            colors={colors}
          />

          <SettingsMenuItem
            icon={<SettingsIcon size={24} color={colors.primary} />}
            title="Biometric Authentication"
            colors={colors}
            right={
              <Switch
                trackColor={{
                  false: colors.border,
                  true: 'rgba(10, 132, 255, 0.4)',
                }}
                thumbColor={biometricEnabled ? colors.primary : '#f4f3f4'}
                ios_backgroundColor={colors.border}
                onValueChange={setBiometricEnabled}
                value={biometricEnabled}
              />
            }
          />

          <SettingsMenuItem
            icon={<Moon size={24} color={colors.primary} />}
            title="Dark Mode"
            subtitle={`Currently using ${theme} mode`}
            colors={colors}
            right={
              <Switch
                trackColor={{
                  false: colors.border,
                  true: 'rgba(10, 132, 255, 0.4)',
                }}
                thumbColor={theme === 'dark' ? colors.primary : '#f4f3f4'}
                ios_backgroundColor={colors.border}
                onValueChange={toggleTheme}
                value={theme === 'dark'}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Support
          </Text>

          <SettingsMenuItem
            icon={<HelpCircle size={24} color={colors.primary} />}
            title="Help & Support"
            subtitle="Get help with your account"
            onPress={() => {}}
            colors={colors}
          />

          <SettingsMenuItem
            icon={<Shield size={24} color={colors.primary} />}
            title="Privacy Policy"
            onPress={() => {}}
            colors={colors}
          />

          <SettingsMenuItem
            icon={<Shield size={24} color={colors.primary} />}
            title="Terms of Service"
            onPress={() => {}}
            colors={colors}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.logoutButton,
            { backgroundColor: 'rgba(255, 69, 58, 0.1)' },
          ]}
          onPress={logout}
        >
          <LogOut size={24} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Log Out
          </Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: colors.darkGray }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  colors: any;
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  icon,
  title,
  subtitle,
  right,
  onPress,
  colors,
}) => (
  <TouchableOpacity
    style={[styles.menuItem, { backgroundColor: colors.card }]}
    onPress={onPress}
  >
    <View
      style={[
        styles.menuItemIcon,
        { backgroundColor: 'rgba(10, 132, 255, 0.1)' },
      ]}
    >
      {icon}
    </View>
    <View style={styles.menuItemTextContainer}>
      <Text style={[styles.menuItemTitle, { color: colors.text }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.menuItemSubtitle, { color: colors.darkGray }]}>
          {subtitle}
        </Text>
      )}
    </View>
    {right ? right : <ChevronRight size={20} color={colors.darkGray} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  screenTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  menuItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  menuItemSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 12,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
});
