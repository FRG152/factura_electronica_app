import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Colors } from '../constants';
import { Plus, FileText, TrendingUp, Users, Search } from 'lucide-react-native';
import Card from '../components/Card';
import ExpandableDocumentCard from '../components/ExpandableDocumentCard';
import { Documento, Screen } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: '1',
      tipo: 'Factura',
      numero: '001-001-0000001',
      fecha: '2024-01-15',
      cliente: 'Cliente Ejemplo 1',
      total: 150000,
      estado: 'emitida',
    },
    {
      id: '2',
      tipo: 'Nota de Crédito',
      numero: '001-001-0000002',
      fecha: '2024-01-16',
      cliente: 'Cliente Ejemplo 2',
      total: 25000,
      estado: 'borrador',
    },
    {
      id: '3',
      tipo: 'Factura',
      numero: '001-001-0000003',
      fecha: '2024-01-17',
      cliente: 'Cliente Ejemplo 3',
      total: 75000,
      estado: 'emitida',
    },
  ]);

  const stats = {
    facturasEmitidas: 24,
    totalFacturado: 1250000,
    clientesActivos: 8,
    pendientes: 3,
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleViewDocument = (documento: Documento) => {
    console.log('Ver documento:', documento);
  };

  const handleDownloadDocument = (documento: Documento) => {
    console.log('Descargar documento:', documento);
  };

  const renderDocumentItem = ({ item }: { item: Documento }) => (
    <ExpandableDocumentCard
      documento={item}
      onView={handleViewDocument}
      onDownload={handleDownloadDocument}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.userName}>Juan Pérez</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: Colors.primary + '20' },
              ]}
            >
              <FileText size={24} color={Colors.primary} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>{stats.facturasEmitidas}</Text>
              <Text style={styles.statLabel}>Facturas Emitidas</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: Colors.secondary + '20' },
              ]}
            >
              <TrendingUp size={24} color={Colors.secondary} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>
                {stats.totalFacturado.toLocaleString('es-PY', {
                  style: 'currency',
                  currency: 'PYG',
                  minimumFractionDigits: 0,
                })}
              </Text>
              <Text style={styles.statLabel}>Total Facturado</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <View
              style={[styles.statIcon, { backgroundColor: Colors.info + '20' }]}
            >
              <Users size={24} color={Colors.info} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>{stats.clientesActivos}</Text>
              <Text style={styles.statLabel}>Clientes Activos</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('Generate')}
          >
            <View
              style={[styles.actionIcon, { backgroundColor: Colors.primary }]}
            >
              <Plus size={24} color={Colors.white} />
            </View>
            <Text style={styles.actionText}>Nueva Factura</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View
              style={[styles.actionIcon, { backgroundColor: Colors.secondary }]}
            >
              <FileText size={24} color={Colors.white} />
            </View>
            <Text style={styles.actionText}>Ver Documentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Documents */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Documentos Recientes</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={documentos}
          renderItem={renderDocumentItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.white,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});

export default HomeScreen;
