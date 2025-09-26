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
import { Plus, Search } from 'lucide-react-native';
import ExpandableDocumentCard from '../components/ExpandableDocumentCard';
import DocumentFilter from '../components/DocumentFilter';
import {
  Documento,
  Screen,
  ListarDocumentosParams,
  DocumentoAPI,
} from '../types';
import { documentService } from '../services/documentService';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [documentos, setDocumentos] = useState<(Documento | DocumentoAPI)[]>(
    [],
  );
  const [loading, setLoading] = useState(true); // Start with loading true
  const [initialLoading, setInitialLoading] = useState(true);
  const [filters, setFilters] = useState<ListarDocumentosParams>({
    page: 1,
    limit: 10,
    sortBy: 'fechaCreacion',
    sortOrder: 'desc',
  });

  const stats = {
    facturasEmitidas: 24,
    totalFacturado: 1250000,
    clientesActivos: 8,
    pendientes: 3,
  };

  const loadDocuments = async (newFilters: ListarDocumentosParams = {}) => {
    try {
      setLoading(true);
      const filtersToUse =
        Object.keys(newFilters).length > 0
          ? newFilters
          : {
              page: 1,
              limit: 10,
              sortBy: 'fechaCreacion',
              sortOrder: 'desc' as const,
            };

      console.log('Loading documents with filters:', filtersToUse);
      const response = await documentService.getDocumentos(filtersToUse);
      console.log('API Response:', response);

      // Check if response has the expected structure
      if (response && response.documentos) {
        setDocumentos(response.documentos);
      } else {
        console.warn('Unexpected response structure:', response);
        setDocumentos([]);
      }
    } catch (error) {
      console.error('Error loading documents from API:', error);
      setDocumentos([]);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDocuments(filters);
    setRefreshing(false);
  };

  const handleApplyFilter = (newFilters: ListarDocumentosParams) => {
    setFilters(newFilters);
    loadDocuments(newFilters);
  };

  const handleClearFilter = () => {
    setFilters({});
    loadDocuments({});
  };

  React.useEffect(() => {
    const initializeData = async () => {
      try {
        await loadDocuments();
      } catch (error) {
        console.error('Error initializing HomeScreen:', error);
      }
    };

    initializeData();
  }, []);

  const handleViewDocument = (documento: Documento | DocumentoAPI) => {
    console.log('Ver documento:', documento);
  };

  const handleDownloadDocument = (documento: Documento | DocumentoAPI) => {
    console.log('Descargar documento:', documento);
  };

  const renderDocumentItem = ({ item }: { item: Documento | DocumentoAPI }) => (
    <ExpandableDocumentCard
      documento={item}
      onView={handleViewDocument}
      onDownload={handleDownloadDocument}
    />
  );

  // Add error boundary for rendering
  if (initialLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.userName}>Juan Pérez</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inicio</Text>
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
        </View>
      </View>

      {/* Recent Documents */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Documentos Recientes</Text>
          <View style={styles.headerActions}>
            <DocumentFilter
              onApplyFilter={handleApplyFilter}
              onClearFilter={handleClearFilter}
              currentFilters={filters}
            />
          </View>
        </View>

        {initialLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando documentos...</Text>
          </View>
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Actualizando...</Text>
          </View>
        ) : documentos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay documentos disponibles</Text>
            <Text style={styles.emptySubtext}>
              Los documentos aparecerán aquí cuando estén disponibles
            </Text>
          </View>
        ) : (
          // <FlatList
          //   data={documentos}
          //   renderItem={renderDocumentItem}
          //   keyExtractor={item => String(item.id)}
          //   scrollEnabled={false}
          //   showsVerticalScrollIndicator={false}
          // />
          <></>
        )}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
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
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
