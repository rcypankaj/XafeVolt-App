import { StyleSheet } from 'react-native';

import Dashboard from '@/components/Dashboard';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const bgScale = useSharedValue(0.8);
  const bgRotate = useSharedValue(0);
  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bgScale.value }, { rotate: `${bgRotate.value}deg` }],
  }));
  return (
    <SafeAreaView className="flex-1">
      <Dashboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
