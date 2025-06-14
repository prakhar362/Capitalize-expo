import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';

interface AnimatedNumbersProps {
  value: number;
  duration?: number;
  style?: any;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ 
  value, 
  duration = 2000,
  style 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [value, duration]);

  return (
    <Animated.Text
      style={[styles.text, style]}
    >
      {animatedValue.interpolate({
        inputRange: [0, value],
        outputRange: ['0', value.toString()],
      })}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});

export default AnimatedNumbers; 