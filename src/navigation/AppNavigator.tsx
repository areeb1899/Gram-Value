import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ThemeContext } from '../contexts/ThemeContext';
import { TouchableOpacity } from 'react-native';
import { History, Settings } from 'lucide-react-native';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { colors, isDark } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            headerTitle: '',
            headerRight: () => (
              <React.Fragment>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('History')}
                  style={{ marginRight: 16, padding: 8 }}
                >
                  <History color={colors.textSecondary} size={24} />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Settings')}
                  style={{ padding: 8 }}
                >
                  <Settings color={colors.textSecondary} size={24} />
                </TouchableOpacity>
              </React.Fragment>
            ),
          })}
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ headerTitle: '' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ headerTitle: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
