import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculationRecord } from '../types';

const HISTORY_KEY = '@gram_value_history';

export const saveCalculation = async (record: Omit<CalculationRecord, 'id' | 'timestamp'>): Promise<CalculationRecord | null> => {
  try {
    const newRecord: CalculationRecord = {
      ...record,
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };

    const existingHistory = await getHistory();
    const updatedHistory = [newRecord, ...existingHistory];
    
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return newRecord;
  } catch (error) {
    console.error('Error saving calculation:', error);
    return null;
  }
};

export const getHistory = async (): Promise<CalculationRecord[]> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

export const deleteHistoryRecord = async (id: string): Promise<boolean> => {
  try {
    const existingHistory = await getHistory();
    const updatedHistory = existingHistory.filter(record => record.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error deleting record:', error);
    return false;
  }
};

export const clearHistory = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
};
