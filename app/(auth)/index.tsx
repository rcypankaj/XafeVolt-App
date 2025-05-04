import Button from '@/components/Atoms/Button';
import { ThemedText } from '@/components/ThemedText';
import { Spacing } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Fingerprint, Shield, Smartphone } from 'lucide-react-native';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  const { colors, theme } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[
            theme === 'dark'
              ? 'rgba(10, 132, 255, 0.2)'
              : 'rgba(10, 132, 255, 0.1)',
            theme === 'dark'
              ? 'rgba(94, 92, 230, 0.1)'
              : 'rgba(94, 92, 230, 0.05)',
          ]}
          style={styles.gradient}
        />

        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/3943726/pexels-photo-3943726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
            style={styles.logo}
          />
          <ThemedText style={{ color: colors.text }} type="title">
            SecureAuth
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.darkGray }]}>
            Secure authentication with biometric verification
          </ThemedText>
        </View>

        <View style={styles.featuresContainer}>
          <FeatureItem
            icon={<Smartphone size={24} color={colors.primary} />}
            title="Phone Number Authentication"
            description="Quickly verify your identity using your phone number"
            colors={colors}
          />
          <FeatureItem
            icon={<Fingerprint size={24} color={colors.primary} />}
            title="Biometric Security"
            description="Add an extra layer of security with biometric verification"
            colors={colors}
          />
          <FeatureItem
            icon={<Shield size={24} color={colors.primary} />}
            title="Secure Recovery"
            description="Multiple recovery options if you lose access to your account"
            colors={colors}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Log In"
            onPress={() => router.push('/login')}
            fullWidth
            style={styles.button}
          />
          <Button
            title="Sign Up"
            variant="outline"
            onPress={() => router.push('/signup')}
            fullWidth
            style={styles.button}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordLink}
          onPress={() => router.push('/forgot-password')}
        >
          <ThemedText
            style={[styles.forgotPasswordText, { color: colors.primary }]}
          >
            Forgot Password?
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colors: any;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  colors,
}) => (
  <View style={[styles.featureItem, { backgroundColor: colors.card }]}>
    <View
      style={[
        styles.featureIconContainer,
        { backgroundColor: 'rgba(10, 132, 255, 0.1)' },
      ]}
    >
      {icon}
    </View>
    <View style={styles.featureTextContainer}>
      <ThemedText style={[styles.featureTitle, { color: colors.text }]}>
        {title}
      </ThemedText>
      <ThemedText
        style={[styles.featureDescription, { color: colors.darkGray }]}
      >
        {description}
      </ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '60%',
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 80 : 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 24,
  },

  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: Spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  forgotPasswordLink: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
  },
});
