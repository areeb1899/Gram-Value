import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../contexts/ThemeContext';
import { ThemeType } from '../types';
import { Typography } from '../constants/theme';
import { Moon, Sun, Monitor, Check } from 'lucide-react-native';

export const SettingsScreen = () => {
  const { colors, theme, setTheme } = useContext(ThemeContext);

  const themeOptions: { label: string; value: ThemeType; icon: React.ReactNode }[] = [
    { label: 'Light Mode', value: 'light', icon: <Sun size={20} color={colors.text} /> },
    { label: 'Dark Mode', value: 'dark', icon: <Moon size={20} color={colors.text} /> },
    { label: 'System Default', value: 'system', icon: <Monitor size={20} color={colors.text} /> },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[Typography.h1, { color: colors.text }]}>Settings</Text>
      </View>

      <View style={styles.content}>
        <Text style={[Typography.h3, styles.sectionTitle, { color: colors.textSecondary }]}>
          Appearance
        </Text>
        
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {themeOptions.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionRow,
                index !== themeOptions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
              onPress={() => setTheme(option.value)}
            >
              <View style={styles.optionLeft}>
                {option.icon}
                <Text style={[Typography.body, { color: colors.text, marginLeft: 12 }]}>
                  {option.label}
                </Text>
              </View>
              {theme === option.value && (
                <Check size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[Typography.h3, styles.sectionTitle, { color: colors.textSecondary }]}>
          About
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.optionRow, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
            <Text style={[Typography.body, { color: colors.text }]}>App Version</Text>
            <Text style={[Typography.body, { color: colors.textSecondary }]}>1.0.0</Text>
          </View>
          <View style={styles.optionRow}>
            <Text style={[Typography.body, { color: colors.text }]}>Developer</Text>
            <Text style={[Typography.body, { color: colors.textSecondary }]}>Areeb Ahmed</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
