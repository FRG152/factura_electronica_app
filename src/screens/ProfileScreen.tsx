import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, menuItems, userExample } from '../constants';

interface ProfileScreenProps {
  onLogout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const handleMenuPress = (action: string) => {
    switch (action) {
      case 'editProfile':
        Alert.alert('Editar Perfil', 'Función de editar perfil');
        break;
      case 'companySettings':
        Alert.alert(
          'Configuración de Empresa',
          'Función de configuración de empresa',
        );
        break;
      case 'billingSettings':
        Alert.alert(
          'Configuración de Facturación',
          'Función de configuración de facturación',
        );
        break;
      case 'notifications':
        Alert.alert('Notificaciones', 'Función de notificaciones');
        break;
      case 'help':
        Alert.alert('Ayuda y Soporte', 'Función de ayuda y soporte');
        break;
      case 'logout':
        Alert.alert(
          'Cerrar Sesión',
          '¿Estás seguro de que quieres cerrar sesión?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Cerrar Sesión',
              style: 'destructive',
              onPress: () => onLogout?.(),
            },
          ],
        );
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <Image source={{ uri: userExample.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userExample.name}</Text>
            <Text style={styles.userEmail}>{userExample.email}</Text>
            <Text style={styles.userCompany}>{userExample.company}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Facturas</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>$12,450</Text>
          <Text style={styles.statLabel}>Total Facturado</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Clientes</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              item.action === 'logout' && styles.logoutItem,
            ]}
            onPress={() => handleMenuPress(item.action)}
          >
            <View style={styles.menuItemLeft}>
              <Text
                style={[
                  styles.menuTitle,
                  item.action === 'logout' && styles.logoutText,
                ]}
              >
                {item.title}
              </Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>Versión 1.0.0</Text>
        <Text style={styles.appCopyright}>© 2024 Mi Empresa</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 3,
  },
  userCompany: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  statsContainer: {
    backgroundColor: Colors.white,
    margin: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 10,
  },
  menuContainer: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  logoutText: {
    color: Colors.error,
  },
  menuArrow: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
  appInfo: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default ProfileScreen;
