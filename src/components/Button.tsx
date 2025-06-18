import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  style?: ViewStyle;
  color?: string; // Optional color prop
}

const Button: React.FC<ButtonProps> = ({ onPress, title, style, color = '#6495ED' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
});

export default Button;
