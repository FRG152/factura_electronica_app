import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, User, Plus } from 'lucide-react-native';
import { Colors } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GenerateInvoiceScreen from '../screens/GenerateInvoiceScreen';
import { Screen } from '../types';

interface SimpleNavigatorProps {
  onLogout?: () => void;
}

const SimpleNavigator: React.FC<SimpleNavigatorProps> = ({ onLogout }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'Generate':
        return <GenerateInvoiceScreen />;
      case 'Profile':
        return <ProfileScreen onLogout={onLogout} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, currentScreen === 'Home' && styles.activeTab]}
          onPress={() => setCurrentScreen('Home')}
        >
          <Home
            size={24}
            color={
              currentScreen === 'Home' ? Colors.primary : Colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabLabel,
              currentScreen === 'Home' && styles.activeTabLabel,
            ]}
          >
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentScreen === 'Generate' && styles.activeTab]}
          onPress={() => setCurrentScreen('Generate')}
        >
          <Plus
            size={24}
            color={
              currentScreen === 'Generate'
                ? Colors.primary
                : Colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabLabel,
              currentScreen === 'Generate' && styles.activeTabLabel,
            ]}
          >
            Generar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentScreen === 'Profile' && styles.activeTab]}
          onPress={() => setCurrentScreen('Profile')}
        >
          <User
            size={24}
            color={
              currentScreen === 'Profile'
                ? Colors.primary
                : Colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabLabel,
              currentScreen === 'Profile' && styles.activeTabLabel,
            ]}
          >
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    // Estilo para tab activo si es necesario
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginTop: 4,
  },
  activeTabLabel: {
    color: Colors.primary,
  },
});

export default SimpleNavigator;
