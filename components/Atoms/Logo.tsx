import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  FeBlend,
  FeColorMatrix,
  FeGaussianBlur,
  Filter,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

interface LogoProps {
  size?: number;
  color?: string;
  scale?: Animated.SharedValue<number>;
  opacity?: Animated.SharedValue<number>;
  variant?: 'default' | 'minimal' | 'background';
}

export function Logo({
  size = 80,
  color = '#60A5FA',
  scale,
  opacity,
  variant = 'default',
}: LogoProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale?.value ?? 1 }],
    opacity: opacity?.value ?? 1,
  }));

  const logoContent = (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color} stopOpacity={0.8} />
          <Stop offset="50%" stopColor="#3B82F6" stopOpacity={0.6} />
          <Stop offset="100%" stopColor="#2563EB" stopOpacity={0.4} />
        </LinearGradient>

        <Filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <FeGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <FeColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.376   0 0 0 0 0.51   0 0 0 0 0.98  0 0 0 1 0"
            result="glow"
          />
          <FeBlend in="SourceGraphic" in2="glow" mode="screen" />
        </Filter>

        <LinearGradient
          id="circuitGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#60A5FA" stopOpacity={0.4} />
          <Stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
        </LinearGradient>
      </Defs>

      {/* Glowing background effect */}
      <Circle
        cx="12"
        cy="12"
        r="11"
        fill="url(#circuitGradient)"
        opacity={0.15}
      />

      {/* Enhanced hexagon grid with glow */}
      <G opacity={0.4} filter="url(#glow)">
        <G transform="translate(4 4) scale(0.6666)">
          <Path
            d="M10 1l6 3.464v6.928l-6 3.464L4 11.392V4.464L10 1z"
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
        </G>
        <G transform="translate(12 4) scale(0.6666)">
          <Path
            d="M10 1l6 3.464v6.928l-6 3.464L4 11.392V4.464L10 1z"
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
        </G>
        <G transform="translate(8 8) scale(0.6666)">
          <Path
            d="M10 1l6 3.464v6.928l-6 3.464L4 11.392V4.464L10 1z"
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
        </G>
      </G>

      {/* Enhanced shield with gradient and glow */}
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        fill="url(#shieldGradient)"
        stroke="#3B82F6"
        strokeWidth={1.5}
        filter="url(#glow)"
      />

      {/* Enhanced CPU circuit pattern */}
      <G transform="translate(8 8) scale(0.35)" filter="url(#glow)">
        <Rect
          x={2}
          y={2}
          width={20}
          height={20}
          rx={2}
          stroke={color}
          strokeWidth={2}
          fill="none"
          opacity={0.6}
        />
        <Path
          d="M7 12h10M12 7v10"
          stroke={color}
          strokeWidth={2}
          opacity={0.6}
        />
        <Circle cx="12" cy="12" r="2" fill={color} opacity={0.6} />
      </G>

      {/* Enhanced lock with glow */}
      <G transform="translate(9 7) scale(0.25)" filter="url(#glow)">
        <Rect
          x={3}
          y={11}
          width={18}
          height={11}
          rx={2}
          stroke="#FFFFFF"
          strokeWidth={2.5}
          fill="none"
        />
        <Path
          d="M7 11V7a5 5 0 0110 0v4"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          fill="none"
        />
      </G>
    </Svg>
  );

  if (variant === 'background') {
    return (
      <View
        style={{
          position: 'absolute',
          width: size * 4,
          height: size * 4,
          opacity: 0.05,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ position: 'absolute', transform: [{ scale: 2 }] }}>
          {logoContent}
        </View>
        <View
          style={{
            position: 'absolute',
            transform: [{ scale: 1.5 }, { rotate: '45deg' }],
          }}
        >
          {logoContent}
        </View>
        <View
          style={{
            position: 'absolute',
            transform: [{ scale: 1 }, { rotate: '-45deg' }],
          }}
        >
          {logoContent}
        </View>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        {
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          height: size,
        },
        variant === 'minimal' && { transform: [{ scale: 0.8 }] },
        animatedStyle,
      ]}
    >
      {logoContent}
    </Animated.View>
  );
}
