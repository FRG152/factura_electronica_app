import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { Filter, X, Search, Calendar } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { ListarDocumentosParams } from '../types';

interface DocumentFilterProps {
  onApplyFilter: (filters: ListarDocumentosParams) => void;
  onClearFilter: () => void;
  currentFilters: ListarDocumentosParams;
}

const DocumentFilter: React.FC<DocumentFilterProps> = ({
  onApplyFilter,
  onClearFilter,
  currentFilters,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] =
    useState<ListarDocumentosParams>(currentFilters);

  const estados = [
    { value: 'APROBADO', label: 'Aprobado' },
    { value: 'RECHAZADO', label: 'Rechazado' },
    { value: 'PENDIENTE', label: 'Pendiente' },
    { value: 'PROCESANDO', label: 'Procesando' },
  ];

  const sortOptions = [
    { value: 'fechaCreacion', label: 'Fecha de Creación' },
    { value: 'numeroDocumento', label: 'Número de Documento' },
    { value: 'estado', label: 'Estado' },
  ];

  const handleApplyFilter = () => {
    onApplyFilter(filters);
    setModalVisible(false);
  };

  const handleClearFilter = () => {
    setFilters({});
    onClearFilter();
    setModalVisible(false);
  };

  const hasActiveFilters = Object.keys(currentFilters).length > 0;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.filterButton,
          hasActiveFilters && styles.filterButtonActive,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Filter
          size={20}
          color={hasActiveFilters ? Colors.white : Colors.primary}
        />
        <Text
          style={[
            styles.filterButtonText,
            hasActiveFilters && styles.filterButtonTextActive,
          ]}
        >
          Filtros
        </Text>
        {hasActiveFilters && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {Object.keys(currentFilters).length}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtrar Documentos</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Estado */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Estado</Text>
              <View style={styles.optionsContainer}>
                {estados.map(estado => (
                  <TouchableOpacity
                    key={estado.value}
                    style={[
                      styles.optionButton,
                      filters.estado === estado.value &&
                        styles.optionButtonActive,
                    ]}
                    onPress={() =>
                      setFilters(prev => ({
                        ...prev,
                        estado:
                          prev.estado === estado.value
                            ? undefined
                            : estado.value,
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        filters.estado === estado.value &&
                          styles.optionTextActive,
                      ]}
                    >
                      {estado.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Número de Documento */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Número de Documento</Text>
              <View style={styles.inputContainer}>
                <Search size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ej: 0000010"
                  value={filters.numeroDocumento || ''}
                  onChangeText={text =>
                    setFilters(prev => ({
                      ...prev,
                      numeroDocumento: text || undefined,
                    }))
                  }
                />
              </View>
            </View>

            {/* CDC */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>CDC</Text>
              <View style={styles.inputContainer}>
                <Search size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Código de Control"
                  value={filters.cdc || ''}
                  onChangeText={text =>
                    setFilters(prev => ({
                      ...prev,
                      cdc: text || undefined,
                    }))
                  }
                />
              </View>
            </View>

            {/* Ordenamiento */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Ordenar por</Text>
              <View style={styles.optionsContainer}>
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      filters.sortBy === option.value &&
                        styles.optionButtonActive,
                    ]}
                    onPress={() =>
                      setFilters(prev => ({
                        ...prev,
                        sortBy:
                          prev.sortBy === option.value
                            ? undefined
                            : option.value,
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        filters.sortBy === option.value &&
                          styles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Orden */}
            {filters.sortBy && (
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Orden</Text>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      filters.sortOrder === 'asc' && styles.optionButtonActive,
                    ]}
                    onPress={() =>
                      setFilters(prev => ({
                        ...prev,
                        sortOrder: 'asc',
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        filters.sortOrder === 'asc' && styles.optionTextActive,
                      ]}
                    >
                      Ascendente
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      filters.sortOrder === 'desc' && styles.optionButtonActive,
                    ]}
                    onPress={() =>
                      setFilters(prev => ({
                        ...prev,
                        sortOrder: 'desc',
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        filters.sortOrder === 'desc' && styles.optionTextActive,
                      ]}
                    >
                      Descendente
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Límite de resultados */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Resultados por página</Text>
              <View style={styles.optionsContainer}>
                {[10, 20, 50].map(limit => (
                  <TouchableOpacity
                    key={limit}
                    style={[
                      styles.optionButton,
                      filters.limit === limit && styles.optionButtonActive,
                    ]}
                    onPress={() =>
                      setFilters(prev => ({
                        ...prev,
                        limit: prev.limit === limit ? undefined : limit,
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        filters.limit === limit && styles.optionTextActive,
                      ]}
                    >
                      {limit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilter}
            >
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilter}
            >
              <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  badge: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  optionButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  optionTextActive: {
    color: Colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    gap: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
    gap: 12,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default DocumentFilter;
