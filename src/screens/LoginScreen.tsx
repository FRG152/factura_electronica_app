import {
  Text,
  View,
  Alert,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Colors } from '../constants';
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react-native';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!usuario.trim()) {
      Alert.alert('Error', 'Por favor ingrese su usuario');
      return;
    }

    if (!contraseña.trim()) {
      Alert.alert('Error', 'Por favor ingrese su contraseña');
      return;
    }

    setCargando(true);

    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      if (usuario === 'admin' && contraseña === '123456') {
        Alert.alert('Éxito', 'Inicio de sesión exitoso', [
          {
            text: 'OK',
            onPress: () => {
              onLoginSuccess?.();
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Facturación Electrónica</Text>
            <Text style={styles.subtitle}>Iniciar Sesión</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Usuario</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese su usuario"
                  value={usuario}
                  onChangeText={setUsuario}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!cargando}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese su contraseña"
                  value={contraseña}
                  onChangeText={setContraseña}
                  secureTextEntry={!mostrarContraseña}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!cargando}
                />
                <TouchableOpacity
                  onPress={() => setMostrarContraseña(!mostrarContraseña)}
                  style={styles.eyeButton}
                >
                  {mostrarContraseña ? (
                    <EyeOff size={20} color={Colors.textSecondary} />
                  ) : (
                    <Eye size={20} color={Colors.textSecondary} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Botón de Login */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                cargando && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={cargando}
            >
              <Text style={styles.loginButtonText}>
                {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  eyeButton: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.textSecondary,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
