import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { CalculationCard } from '../components/CalculationCard';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { getHistory, deleteHistoryRecord, clearHistory } from '../utils/storage';
import { CalculationRecord } from '../types';
import { Typography } from '../constants/theme';
import { Search, Trash2 } from 'lucide-react-native';

export const HistoryScreen = () => {
  const { colors } = useContext(ThemeContext);
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    const data = await getHistory();
    setHistory(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const handleDelete = async (id: string) => {
    const success = await deleteHistoryRecord(id);
    if (success) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all saved calculations?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            const success = await clearHistory();
            if (success) {
              setHistory([]);
            }
          }
        }
      ]
    );
  };

  const filteredHistory = history.filter(item => 
    item.pricePerKg.includes(searchQuery) || 
    item.weight.includes(searchQuery) ||
    item.totalPrice.toString().includes(searchQuery)
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[Typography.h1, { color: colors.text }]}>History</Text>
        {history.length > 0 && (
          <CustomButton 
            title="Clear All" 
            onPress={handleClearAll} 
            variant="danger" 
            style={styles.clearBtn} 
            textStyle={{ fontSize: 14 }}
            icon={<Trash2 color="#FFF" size={16} />}
          />
        )}
      </View>

      <View style={styles.searchContainer}>
        <CustomInput
          label=""
          placeholder="Search calculations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search color={colors.textSecondary} size={20} />}
        />
      </View>

      {history.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={[Typography.h3, { color: colors.textSecondary }]}>No history found</Text>
          <Text style={[Typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: 8 }]}>
            Your saved calculations will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredHistory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CalculationCard record={item} onDelete={handleDelete} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 8,
  },
  clearBtn: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});
