import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../contexts/ThemeContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { UnitSelector } from '../components/UnitSelector';
import { calculatePrice, calculateWeightFromPrice, formatCurrency } from '../utils/calculations';
import { saveCalculation } from '../utils/storage';
import { Unit } from '../types';
import { Typography } from '../constants/theme';
import { Calculator, Save } from 'lucide-react-native';

type CalcMode = 'price' | 'weight';

export const HomeScreen = ({ navigation }: any) => {
  const { colors } = useContext(ThemeContext);
  
  const [mode, setMode] = useState<CalcMode>('price');
  
  // Inputs
  const [pricePerKg, setPricePerKg] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [unit, setUnit] = useState<Unit>('g');
  
  // Results
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [calculatedWeight, setCalculatedWeight] = useState(0);

  useEffect(() => {
    if (mode === 'price') {
      const p = calculatePrice(pricePerKg, weightInput, unit);
      setCalculatedPrice(p);
    } else {
      const w = calculateWeightFromPrice(pricePerKg, priceInput, unit);
      setCalculatedWeight(w);
    }
  }, [pricePerKg, weightInput, priceInput, unit, mode]);

  const handleSave = async () => {
    let finalWeight = '';
    let finalPrice = 0;

    if (mode === 'price') {
      if (!pricePerKg || !weightInput || calculatedPrice <= 0) {
        Alert.alert('Error', 'Please enter valid numbers to calculate.');
        return;
      }
      finalWeight = weightInput;
      finalPrice = calculatedPrice;
    } else {
      if (!pricePerKg || !priceInput || calculatedWeight <= 0) {
        Alert.alert('Error', 'Please enter valid numbers to calculate.');
        return;
      }
      finalWeight = Number.isInteger(calculatedWeight) 
        ? calculatedWeight.toString() 
        : calculatedWeight.toFixed(2);
      finalPrice = parseFloat(priceInput);
    }

    const saved = await saveCalculation({
      pricePerKg,
      weight: finalWeight,
      unit,
      totalPrice: finalPrice,
    });

    if (saved) {
      Alert.alert('Success', 'Calculation saved to history!');
      if (mode === 'price') {
        setWeightInput('');
      } else {
        setPriceInput('');
      }
    } else {
      Alert.alert('Error', 'Failed to save calculation.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <Calculator size={32} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={[Typography.h1, { color: colors.text }]}>Gram Value</Text>
            </View>
            <Text style={[Typography.body, { color: colors.textSecondary, marginTop: 8 }]}>
              {mode === 'price' ? 'Calculate price based on weight' : 'Calculate weight based on price'}
            </Text>
          </View>

          {/* Mode Switcher */}
          <View style={[styles.modeContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <TouchableOpacity 
              style={[styles.modeTab, mode === 'price' && { backgroundColor: colors.primary }]}
              onPress={() => setMode('price')}
            >
              <Text style={[Typography.body, { color: mode === 'price' ? '#FFF' : colors.text, fontWeight: mode === 'price' ? '600' : '400' }]}>
                Find Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modeTab, mode === 'weight' && { backgroundColor: colors.primary }]}
              onPress={() => setMode('weight')}
            >
              <Text style={[Typography.body, { color: mode === 'weight' ? '#FFF' : colors.text, fontWeight: mode === 'weight' ? '600' : '400' }]}>
                Find Weight
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <CustomInput
              label="Price per Kilogram (₹/kg)"
              placeholder="e.g., 500"
              value={pricePerKg}
              onChangeText={setPricePerKg}
              keyboardType="numeric"
            />
            
            {mode === 'price' ? (
              <CustomInput
                label="Weight"
                placeholder="e.g., 250"
                value={weightInput}
                onChangeText={setWeightInput}
                keyboardType="numeric"
              />
            ) : (
              <CustomInput
                label="Total Price (₹)"
                placeholder="e.g., 100"
                value={priceInput}
                onChangeText={setPriceInput}
                keyboardType="numeric"
              />
            )}

            <UnitSelector selectedUnit={unit} onSelect={setUnit} />
          </View>

          <View style={[styles.resultContainer, { backgroundColor: colors.primaryLight }]}>
            <Text style={[Typography.h3, { color: colors.primary }]}>
              {mode === 'price' ? 'Total Price' : 'You will get'}
            </Text>
            <Text style={[styles.resultText, { color: colors.primary }]}>
              {mode === 'price' 
                ? formatCurrency(calculatedPrice)
                : `${Number.isInteger(calculatedWeight) ? calculatedWeight : calculatedWeight.toFixed(2)} ${unit}`
              }
            </Text>
          </View>

          <CustomButton 
            title="Save to History" 
            onPress={handleSave} 
            icon={<Save color="#FFF" size={20} />}
            style={{ marginTop: 24 }}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, flexGrow: 1 },
  header: { marginBottom: 24, marginTop: 8 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  modeContainer: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 24,
  },
  modeTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  resultContainer: {
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 48,
    fontWeight: '700',
    marginTop: 8,
  },
});
