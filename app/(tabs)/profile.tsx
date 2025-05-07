import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import {
  CreditCard as Edit,
  Shield,
  Phone,
  BookUser,
  ArrowRightLeft,
  LogOut,
} from 'lucide-react-native';
import { Spacing } from '@/constants/Theme';

export default function ProfileScreen() {
  const { authState, logout } = useAuth();
  const user = authState.user;

  // Sample security verification status (in a real app, this would come from the server)
  const securityStatus = {
    phoneVerified: true,
    biometricsEnabled: true,
    securityQuestionsSet: true,
    recoveryPhoneSet: true,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.firstName || 'John'} {user?.lastName || 'Doe'}
            </Text>
            <Text style={styles.profilePhone}>
              {user?.phoneNumber || '+1 (555) 123-4567'}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.securityStatusCard}>
          <View style={styles.securityHeader}>
            <Shield size={24} color={Colors.light.primary} />
            <Text style={styles.securityTitle}>Security Status</Text>
          </View>

          <View style={styles.securityItems}>
            <SecurityStatusItem
              title="Phone Verification"
              isVerified={securityStatus.phoneVerified}
            />
            <SecurityStatusItem
              title="Biometric Authentication"
              isVerified={securityStatus.biometricsEnabled}
            />
            <SecurityStatusItem
              title="Security Questions"
              isVerified={securityStatus.securityQuestionsSet}
            />
            <SecurityStatusItem
              title="Recovery Phone"
              isVerified={securityStatus.recoveryPhoneSet}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <ProfileMenuItem
            icon={<Phone size={24} color={Colors.light.primary} />}
            title="Phone Number"
            value={user?.phoneNumber || '+1 (555) 123-4567'}
          />

          <ProfileMenuItem
            icon={<BookUser size={24} color={Colors.light.primary} />}
            title="Personal Information"
            value="Edit your profile details"
          />

          <ProfileMenuItem
            icon={<ArrowRightLeft size={24} color={Colors.light.primary} />}
            title="Account Activity"
            value="View recent logins"
            showBadge
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <ProfileMenuItem
            icon={<Shield size={24} color={Colors.light.primary} />}
            title="Security Settings"
            value="Manage your security preferences"
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={24} color={Colors.light.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SecurityStatusItemProps {
  title: string;
  isVerified: boolean;
}

const SecurityStatusItem: React.FC<SecurityStatusItemProps> = ({
  title,
  isVerified,
}) => (
  <View style={styles.securityStatusItem}>
    <Text style={styles.securityStatusTitle}>{title}</Text>
    <View
      style={[
        styles.securityStatusIndicator,
        isVerified ? styles.verified : styles.notVerified,
      ]}
    >
      <Text
        style={[
          styles.securityStatusText,
          isVerified ? styles.verifiedText : styles.notVerifiedText,
        ]}
      >
        {isVerified ? 'Verified' : 'Pending'}
      </Text>
    </View>
  </View>
);

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  showBadge?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  value,
  showBadge,
}) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemIcon}>{icon}</View>
    <View style={styles.menuItemTextContainer}>
      <Text style={styles.menuItemTitle}>{title}</Text>
      <Text style={styles.menuItemValue}>{value}</Text>
    </View>
    {showBadge && <View style={styles.notificationBadge} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  screenTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    color: Colors.light.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 4,
  },
  profilePhone: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityStatusCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: Colors.light.text,
    marginLeft: 12,
  },
  securityItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  securityStatusItem: {
    width: '48%',
    marginBottom: 12,
  },
  securityStatusTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 8,
  },
  securityStatusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  verified: {
    backgroundColor: 'rgba(48, 209, 88, 0.1)',
  },
  notVerified: {
    backgroundColor: 'rgba(255, 159, 10, 0.1)',
  },
  securityStatusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  verifiedText: {
    color: Colors.light.success,
  },
  notVerifiedText: {
    color: Colors.light.warning,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  menuItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
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
    color: Colors.light.text,
    marginBottom: 4,
  },
  menuItemValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  notificationBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.error,
    marginLeft: 12,
  },
});
