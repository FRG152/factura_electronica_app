import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Eye,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Documento, DocumentoAPI } from '../types';

interface ExpandableDocumentCardProps {
  documento: Documento | DocumentoAPI;
  onView?: (documento: Documento | DocumentoAPI) => void;
  onDownload?: (documento: Documento | DocumentoAPI) => void;
}

const ExpandableDocumentCard: React.FC<ExpandableDocumentCardProps> = ({
  documento,
  onView,
  onDownload,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

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

  // Check if it's API document or mock document
  const isApiDocument = 'cdc' in documento;

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isApiDocument ? 200 : 120],
  });

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
              {isApiDocument
                ? (documento as DocumentoAPI).numeroDocumento
                : (documento as Documento).numero}
            </Text>
            <Text style={styles.documentType}>
              {isApiDocument
                ? 'Factura Electrónica'
                : (documento as Documento).tipo}
            </Text>
            {isApiDocument && (
              <Text style={styles.cdcText}>
                CDC: {(documento as DocumentoAPI).cdc}
              </Text>
            )}
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

      <Animated.View
        style={[styles.expandedContent, { height: heightInterpolate }]}
      >
        <View style={styles.content}>
          {isApiDocument ? (
            <>
              {/* API Document Details */}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estado:</Text>
                <Text style={styles.detailValue}>
                  {(documento as DocumentoAPI).estado}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fecha Creación:</Text>
                <Text style={styles.detailValue}>
                  {new Date(
                    (documento as DocumentoAPI).fechaCreacion,
                  ).toLocaleDateString('es-PY')}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Lote:</Text>
                <Text style={styles.detailValue}>
                  {(documento as DocumentoAPI).lote.numeroLote}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estado Lote:</Text>
                <Text style={styles.detailValue}>
                  {(documento as DocumentoAPI).lote.estado}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Archivo:</Text>
                <Text style={styles.detailValue}>
                  {(documento as DocumentoAPI).nombreArchivo}
                </Text>
              </View>

              {(documento as DocumentoAPI).respuestaSet && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Respuesta SET:</Text>
                  <Text style={styles.detailValue}>
                    {
                      (documento as DocumentoAPI).respuestaSet![
                        'ns2:rEnviConsDeResponse'
                      ]['ns2:dMsgRes']
                    }
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              {/* Mock Document Details */}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cliente:</Text>
                <Text style={styles.detailValue}>
                  {(documento as Documento).cliente}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fecha:</Text>
                <Text style={styles.detailValue}>
                  {(documento as Documento).fecha}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total:</Text>
                <Text style={styles.detailValue}>
                  {(documento as Documento).total.toLocaleString('es-PY', {
                    style: 'currency',
                    currency: 'PYG',
                  })}
                </Text>
              </View>
            </>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onView?.(documento)}
            >
              <Eye size={16} color={Colors.primary} />
              <Text style={styles.actionText}>Ver</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDownload?.(documento)}
            >
              <Download size={16} color={Colors.secondary} />
              <Text style={styles.actionText}>Descargar</Text>
            </TouchableOpacity>

            {isApiDocument && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // TODO: Implement XML viewer
                  console.log('Ver XML:', (documento as DocumentoAPI).xmlConQR);
                }}
              >
                <FileText size={16} color={Colors.warning} />
                <Text style={styles.actionText}>XML</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
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
    overflow: 'hidden',
  },
  content: {
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
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: Colors.background,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
});

export default ExpandableDocumentCard;
