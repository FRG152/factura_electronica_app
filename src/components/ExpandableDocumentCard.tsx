import { Colors } from '../constants/colors';
import { DocumentoAPI } from '../types';
import React, { useState } from 'react';
import { FileText, ChevronUp, ChevronDown } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ExpandableDocumentCardProps {
  documento: DocumentoAPI;
}

const ExpandableDocumentCard: React.FC<ExpandableDocumentCardProps> = ({
  documento,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'emitida':
        return Colors.success;
      case 'borrador':
        return Colors.warning;
      case 'anulada':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const getEstadoBackground = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'emitida':
        return Colors.success + '20';
      case 'borrador':
        return Colors.warning + '20';
      case 'anulada':
        return Colors.error + '20';
      default:
        return Colors.gray100;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <FileText size={20} color={Colors.primary} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.documentNumber}>
              {documento.numeroDocumento}
            </Text>
            <Text style={styles.documentType}>Factura Electrónica</Text>
            <Text style={styles.cdcText}>CDC: {documento.cdc}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View
            style={[
              styles.estadoBadge,
              { backgroundColor: getEstadoBackground(documento.estado) },
            ]}
          >
            <Text
              style={[
                styles.estadoText,
                { color: getEstadoColor(documento.estado) },
              ]}
            >
              {documento.estado}
            </Text>
          </View>
          {expanded ? (
            <ChevronUp size={20} color={Colors.textSecondary} />
          ) : (
            <ChevronDown size={20} color={Colors.textSecondary} />
          )}
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estado:</Text>
            <Text style={styles.detailValue}>{documento.estado}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fecha Creación:</Text>
            <Text style={styles.detailValue}>
              {new Date(documento.fechaCreacion).toLocaleDateString('es-PY')}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Lote:</Text>
            <Text style={styles.detailValue}>{documento.lote.numeroLote}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estado Lote:</Text>
            <Text style={styles.detailValue}>{documento.lote.estado}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Archivo:</Text>
            <Text style={styles.detailValue}>{documento.nombreArchivo}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  documentNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  documentType: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  cdcText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
});

export default ExpandableDocumentCard;
