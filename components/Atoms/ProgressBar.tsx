import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Theme';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  labels,
  showPercentage = false,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {labels && labels[currentStep - 1] && (
          <Text style={styles.stepLabel}>{labels[currentStep - 1]}</Text>
        )}
        {showPercentage && (
          <Text style={styles.percentage}>{Math.round(progress)}%</Text>
        )}
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.step,
              index + 1 <= currentStep
                ? styles.stepActive
                : styles.stepInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: Spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.primary,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    marginBottom: Spacing.m,
  },
  progressBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.border,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.round,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  step: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.round,
  },
  stepActive: {
    backgroundColor: Colors.light.primary,
  },
  stepInactive: {
    backgroundColor: Colors.light.border,
  },
});

export default ProgressBar;
