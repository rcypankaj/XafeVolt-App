// Dashboard.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Avatar, Card, Button } from 'react-native-paper';
import { useAnimatedStyle, withSpring } from 'react-native-reanimated'; // Reanimated for smooth animations
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from '../ThemedText';

const Dashboard = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const credentials = [
    {
      id: 1,
      title: 'Google',
      username: 'user123',
      website: 'google.com',
      icon: 'data:image/png;base64,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',
    },
    {
      id: 2,
      title: 'Facebook',
      username: 'john_doe',
      website: 'facebook.com',
      icon: 'data:image/jpeg;base64,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',
    },
    // Add more credentials...
  ];

  const [fabAnimation] = useState(new Animated.Value(0)); // FAB animation state

  const handleFabPress = () => {
    Animated.spring(fabAnimation, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      router.push('/add-credential'); // Navigate after animation
      // Reset FAB animation after navigating
      setTimeout(() => fabAnimation.setValue(0), 500);
    });
  };

  // Animated style for FAB
  const fabStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(fabAnimation === 1 ? 1.2 : 1) },
        { translateY: withSpring(fabAnimation === 1 ? -10 : 0) },
      ],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <ThemedText
          style={[styles.headerText, { color: colors.darkGray }]}
          type="title"
        >
          Dashboard
        </ThemedText>
        <Avatar.Icon size={40} icon="account" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search credentials"
          placeholderTextColor="#B0B0B0"
          style={styles.searchInput}
        />
      </View>

      {/* Credentials List */}
      <FlatList
        data={credentials}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.credentialCard}>
            <View style={styles.cardContentWrapper}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Image size={40} source={{ uri: item.icon }} />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.username}</Text>
                </View>
                <Button
                  mode="contained"
                  style={styles.viewButton}
                  onPress={() => {}}
                >
                  View
                </Button>
              </Card.Content>
            </View>
          </Card>
        )}
      />

      {/* Floating Action Button */}
      <Animated.View style={[fabStyle, styles.fabContainer]}>
        <TouchableOpacity onPress={handleFabPress} style={styles.fabButton}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  searchInput: {
    padding: 16,
    backgroundColor: '#374151', // bg-gray-700
    borderRadius: 12,
    color: '#FFFFFF',
  },
  cardContentWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  credentialCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#4f46e5', // fallback for gradient
    borderRadius: 16,
    elevation: 6, // shadow
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#D1D5DB', // gray-300
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fabButton: {
    backgroundColor: '#2563EB', // bg-blue-600
    padding: 24,
    borderRadius: 100,
    elevation: 10,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
