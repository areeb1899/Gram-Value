import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Unit } from '../types';
import { Typography } from '../constants/theme';

interface UnitSelectorProps {
  selectedUnit: Unit;
  onSelect: (unit: Unit) => void;
}

const units: { label: string; value: Unit }[] = [
  { label: 'Milligrams (mg)', value: 'mg' },
  { label: 'Grams (g)', value: 'g' },
  { label: 'Kilograms (kg)', value: 'kg' },
];

export const UnitSelector: React.FC<UnitSelectorProps> = ({ selectedUnit, onSelect }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }, Typography.caption]}>
        Select Unit
      </Text>
      <View style={[styles.selectorContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
        {units.map((unit, index) => {
          const isSelected = selectedUnit === unit.value;
          return (
            <TouchableOpacity
              key={unit.value}
              style={[
                styles.segment,
                isSelected && { backgroundColor: colors.primary },
                index === 0 && styles.segmentLeft,
                index === units.length - 1 && styles.segmentRight,
                !isSelected && index !== units.length - 1 && { borderRightWidth: 1, borderRightColor: colors.border }
              ]}
              onPress={() => onSelect(unit.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  Typography.body,
                  { color: isSelected ? '#FFFFFF' : colors.text, fontWeight: isSelected ? '600' : '400' }
                ]}
              >
                {unit.label.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  selectorContainer: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  segmentRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
