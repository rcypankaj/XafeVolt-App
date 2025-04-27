import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Logo } from '../Atoms/Logo';
import { AnimatedText } from './AnimatedText';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const bgScale = useSharedValue(0.8);
  const bgRotate = useSharedValue(0);
  const shimmerX = useSharedValue(-width);

  useEffect(() => {
    // Background animation
    bgScale.value = withRepeat(
      withTiming(1.2, { duration: 20000, easing: Easing.linear }),
      -1,
      true,
    );
    bgRotate.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
    );

    // Shimmer effect
    shimmerX.value = withRepeat(
      withTiming(width, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
    );

    // Logo animation
    scale.value = withSequence(
      withSpring(1.2, { damping: 15 }),
      withDelay(100, withSpring(1, { damping: 12 })),
    );
    opacity.value = withTiming(1, { duration: 1000 });

    // Subtitle animation
    subtitleOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));

    // Complete animation
    const timeout = setTimeout(() => {
      onAnimationComplete?.();
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bgScale.value }, { rotate: `${bgRotate.value}deg` }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: withSpring(subtitleOpacity.value * 20) }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View>
        <Logo size={120} variant="background" />
      </Animated.View>

      {/* Shimmer effect */}
      <Animated.View style={[styles.shimmer, shimmerStyle]} />

      <View style={styles.content}>
        <Logo size={120} scale={scale} opacity={opacity} />
        <View style={styles.textContainer}>
          <AnimatedText text="XafeVolt" style={styles.title} delay={600} />
          <Animated.Text style={[styles.subtitle, subtitleStyle]}>
            Secure Your Digital Life
          </Animated.Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    transform: [{ skewX: '-20deg' }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
    textShadowColor: 'rgba(96, 165, 250, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
