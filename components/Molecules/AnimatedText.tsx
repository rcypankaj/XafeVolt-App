import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface AnimatedTextProps {
  text: string;
  style?: any;
  delay?: number;
  onComplete?: () => void;
}

export function AnimatedText({
  text,
  style,
  delay = 0,
  onComplete,
}: AnimatedTextProps) {
  const characters = text.split('');
  const animations = characters.map(() => useSharedValue(0));

  useEffect(() => {
    characters.forEach((_, index) => {
      const charDelay = delay + index * 100;
      animations[index].value = withDelay(
        charDelay,
        withSequence(
          withSpring(1, { damping: 12 }),
          withSpring(0.9, { damping: 8 }),
          withSpring(1, { damping: 12 }),
        ),
      );
    });

    const timeout = setTimeout(
      () => {
        onComplete?.();
      },
      delay + characters.length * 100 + 500,
    );

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <View style={styles.container}>
      {characters.map((char, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          opacity: animations[index].value,
          transform: [
            { scale: animations[index].value },
            { translateY: (1 - animations[index].value) * 20 },
          ],
        }));

        return (
          <Animated.Text
            key={index}
            style={[style, animatedStyle, styles.character]}
          >
            {char}
          </Animated.Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    textAlign: 'center',
  },
});
