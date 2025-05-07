import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Bell, Shield, Clock, User, Activity } from 'lucide-react-native';
import { Spacing } from '@/constants/Theme';

// Sample notification data
const notifications = [
  {
    id: '1',
    type: 'security',
    title: 'New login detected',
    message: 'A new login was detected from Mountain View, CA.',
    time: '1h ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'account',
    title: 'Recovery phone changed',
    message: 'Your recovery phone number was updated.',
    time: '3h ago',
    isRead: true,
  },
  {
    id: '3',
    type: 'security',
    title: '2FA enabled',
    message: 'Two-factor authentication has been enabled on your account.',
    time: 'Yesterday',
    isRead: true,
  },
  {
    id: '4',
    type: 'account',
    title: 'Profile updated',
    message: 'Your profile information was updated.',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Scheduled maintenance',
    message: 'The system will be undergoing maintenance on Sunday.',
    time: '1 week ago',
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield size={24} color={Colors.light.primary} />;
      case 'account':
        return <User size={24} color={Colors.light.secondary} />;
      case 'activity':
        return <Activity size={24} color={Colors.light.accent} />;
      default:
        return <Bell size={24} color={Colors.light.primary} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Notifications</Text>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.filterActive]}>
          <Text style={[styles.filterText, styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>System</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>New</Text>
        
        {notifications.filter(n => !n.isRead).map(notification => (
          <NotificationItem 
            key={notification.id}
            notification={notification}
            icon={renderIcon(notification.type)}
          />
        ))}
        
        <Text style={styles.sectionTitle}>Earlier</Text>
        
        {notifications.filter(n => n.isRead).map(notification => (
          <NotificationItem 
            key={notification.id}
            notification={notification}
            icon={renderIcon(notification.type)}
          />
        ))}
        
        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Bell size={48} color={Colors.light.darkGray} />
            <Text style={styles.emptyStateText}>No notifications</Text>
            <Text style={styles.emptyStateSubText}>
              You're all caught up! Check back later for new updates.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
  };
  icon: React.ReactNode;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, icon }) => (
  <TouchableOpacity 
    style={[
      styles.notificationItem,
      notification.isRead ? styles.notificationRead : styles.notificationUnread
    ]}
  >
    <View style={styles.notificationIconContainer}>
      {icon}
    </View>
    <View style={styles.notificationContent}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
      <Text style={styles.notificationMessage}>{notification.message}</Text>
    </View>
    {!notification.isRead && <View style={styles.unreadIndicator} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  screenTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    color: Colors.light.text,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  clearButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.light.primary,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: Colors.light.primary,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.darkGray,
    marginVertical: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: Colors.light.card,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  notificationUnread: {
    backgroundColor: 'rgba(10, 132, 255, 0.05)',
  },
  notificationRead: {
    backgroundColor: Colors.light.card,
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.light.text,
  },
  notificationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.light.darkGray,
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.darkGray,
    lineHeight: 20,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
    position: 'absolute',
    top: 16,
    right: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.light.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
});