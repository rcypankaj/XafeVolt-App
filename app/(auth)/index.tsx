import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Atoms/Button';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';
import { Spacing } from '@/constants/Theme';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(10, 132, 255, 0.1)', 'rgba(94, 92, 230, 0.05)']}
        style={styles.gradient}
      />

      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/3943726/pexels-photo-3943726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>SecureAuth</Text>
        <Text style={styles.subtitle}>
          Secure authentication with biometric verification
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <FeatureItem
          title="Phone Number Authentication"
          description="Quickly verify your identity using your phone number"
        />
        <FeatureItem
          title="Biometric Security"
          description="Add an extra layer of security with biometric verification"
        />
        <FeatureItem
          title="Secure Recovery"
          description="Multiple recovery options if you lose access to your account"
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
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconContainer}>
      <ChevronRight size={20} color={Colors.light.primary} />
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 32,
    color: Colors.light.text,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.darkGray,
    textAlign: 'center',
    maxWidth: '80%',
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.darkGray,
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
    fontSize: 16,
    color: Colors.light.primary,
  },
});
