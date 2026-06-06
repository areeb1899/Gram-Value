import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { CalculationRecord } from '../types';
import { formatCurrency } from '../utils/calculations';
import { Typography } from '../constants/theme';
import { Trash2, Copy } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';

interface CalculationCardProps {
  record: CalculationRecord;
  onDelete: (id: string) => void;
}

export const CalculationCard: React.FC<CalculationCardProps> = ({ record, onDelete }) => {
  const { colors } = useContext(ThemeContext);

  const date = new Date(record.timestamp);
  const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const copyToClipboard = async () => {
    const textToCopy = `Price: ${formatCurrency(record.totalPrice)} (Weight: ${record.weight}${record.unit} @ ₹${record.pricePerKg}/kg)`;
    await Clipboard.setStringAsync(textToCopy);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[Typography.caption, { color: colors.textSecondary }]}>
          {formattedDate}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
            <Copy size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(record.id)} style={styles.iconButton}>
            <Trash2 size={18} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[Typography.body, { color: colors.textSecondary }]}>Weight:</Text>
          <Text style={[Typography.h3, { color: colors.text }]}>{record.weight} {record.unit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[Typography.body, { color: colors.textSecondary }]}>Price per kg:</Text>
          <Text style={[Typography.body, { color: colors.text }]}>₹{record.pricePerKg}</Text>
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <View style={styles.row}>
          <Text style={[Typography.h3, { color: colors.textSecondary }]}>Total:</Text>
          <Text style={[Typography.h2, { color: colors.primary }]}>{formatCurrency(record.totalPrice)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 8,
  },
});
