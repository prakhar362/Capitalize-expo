import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface AnimatedNumbersProps {
  value: number;
  duration?: number;
  style?: any;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ 
  value, 
  duration = 4000,
  style 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    // Reset to 0
    setDisplayValue(0);

    // Calculate step size and interval
    const steps = 50; // Number of steps in the animation
    const stepDuration = duration / steps;
    const increment = value / steps;

    let currentStep = 0;
    animationRef.current = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayValue(Math.round(increment * currentStep));
      } else {
        if (animationRef.current) {
          clearInterval(animationRef.current);
        }
      }
    }, stepDuration);

    // Cleanup
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [value, duration]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>
        {displayValue}
      </Text>
      <Text style={styles.percentSign}>%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  percentSign: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  }
});

export default AnimatedNumbers; 