import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import { Bell, CreditCard, ArrowRightLeft, Eye, Shield, LockKeyhole } from 'lucide-react-native';
import { Spacing } from '@/constants/Theme';

export default function HomeScreen() {
  const { authState } = useAuth();
  const user = authState.user;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user?.firstName || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$2,450.50</Text>
          <View style={styles.balanceActions}>
            <ActionButton title="Send" icon={<ArrowRightLeft size={20} color={Colors.light.primary} />} />
            <ActionButton title="Request" icon={<ArrowRightLeft size={20} color={Colors.light.primary} />} />
            <ActionButton title="Pay" icon={<CreditCard size={20} color={Colors.light.primary} />} />
          </View>
        </View>

        <View style={styles.securitySection}>
          <Text style={styles.sectionTitle}>Security Center</Text>
          
          <SecurityCard 
            title="2-Factor Authentication" 
            description="Enabled via Phone Number" 
            icon={<Shield size={24} color={Colors.light.success} />} 
            status="Enabled"
          />
          
          <SecurityCard 
            title="Biometric Authentication" 
            description="Login with biometric verification" 
            icon={<LockKeyhole size={24} color={Colors.light.success} />} 
            status="Enabled"
          />
          
          <SecurityCard 
            title="Account Visibility" 
            description="Control what others can see" 
            icon={<Eye size={24} color={Colors.light.warning} />} 
            status="Review"
          />
        </View>

        <View style={styles.recentActivity}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <ActivityItem 
            title="Password Changed" 
            timestamp="Today, 9:41 AM" 
            amount="" 
            isDebit={false}
            icon={<LockKeyhole size={24} color={Colors.light.primary} />}
          />
          
          <ActivityItem 
            title="Login from New Device" 
            timestamp="Yesterday, 2:30 PM" 
            amount="" 
            isDebit={false}
            icon={<Shield size={24} color={Colors.light.warning} />}
          />
          
          <ActivityItem 
            title="Recovery Phone Updated" 
            timestamp="May 15, 5:23 PM" 
            amount="" 
            isDebit={false}
            icon={<Bell size={24} color={Colors.light.primary} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface ActionButtonProps {
  title: string;
  icon: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, icon }) => (
  <TouchableOpacity style={styles.actionButton}>
    <View style={styles.actionIcon}>{icon}</View>
    <Text style={styles.actionText}>{title}</Text>
  </TouchableOpacity>
);

interface SecurityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: string;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ title, description, icon, status }) => (
  <TouchableOpacity style={styles.securityCard}>
    <View style={styles.securityIconContainer}>{icon}</View>
    <View style={styles.securityInfo}>
      <Text style={styles.securityTitle}>{title}</Text>
      <Text style={styles.securityDescription}>{description}</Text>
    </View>
    <View style={[
      styles.securityStatus, 
      status === 'Enabled' ? styles.statusEnabled : styles.statusWarning
    ]}>
      <Text style={[
        styles.securityStatusText,
        status === 'Enabled' ? styles.statusTextEnabled : styles.statusTextWarning
      ]}>
        {status}
      </Text>
    </View>
  </TouchableOpacity>
);

interface ActivityItemProps {
  title: string;
  timestamp: string;
  amount: string;
  isDebit: boolean;
  icon: React.ReactNode;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, timestamp, amount, isDebit, icon }) => (
  <TouchableOpacity style={styles.activityItem}>
    <View style={styles.activityIconContainer}>{icon}</View>
    <View style={styles.activityInfo}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityTimestamp}>{timestamp}</Text>
    </View>
    {amount && (
      <Text style={[styles.activityAmount, isDebit ? styles.debitAmount : styles.creditAmount]}>
        {isDebit ? '-' : '+'}{amount}
      </Text>
    )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.light.darkGray,
  },
  userName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: Colors.light.text,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  securitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 16,
  },
  securityCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  securityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  securityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  securityStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusEnabled: {
    backgroundColor: 'rgba(48, 209, 88, 0.1)',
  },
  statusWarning: {
    backgroundColor: 'rgba(255, 159, 10, 0.1)',
  },
  securityStatusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  statusTextEnabled: {
    color: Colors.light.success,
  },
  statusTextWarning: {
    color: Colors.light.warning,
  },
  recentActivity: {
    marginBottom: 20,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.primary,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  activityTimestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  activityAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  debitAmount: {
    color: Colors.light.error,
  },
  creditAmount: {
    color: Colors.light.success,
  },
});