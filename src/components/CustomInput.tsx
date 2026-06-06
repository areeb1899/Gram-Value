import React, { useContext } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Typography } from '../constants/theme';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({ 
  label, 
  error, 
  leftIcon, 
  rightIcon, 
  style, 
  ...props 
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }, Typography.caption]}>
        {label}
      </Text>
      <View style={[
        styles.inputContainer, 
        { 
          backgroundColor: colors.inputBackground, 
          borderColor: error ? colors.error : colors.border 
        }
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, { color: colors.text }, Typography.h3, style]}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error ? (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
  },
});
