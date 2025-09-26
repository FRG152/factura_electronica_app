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
import { Documento } from '../types';

interface ExpandableDocumentCardProps {
  documento: Documento;
  onView?: (documento: Documento) => void;
  onDownload?: (documento: Documento) => void;
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

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
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
            <Text style={styles.documentNumber}>{documento.numero}</Text>
            <Text style={styles.documentType}>{documento.tipo}</Text>
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
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cliente:</Text>
            <Text style={styles.detailValue}>{documento.cliente}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fecha:</Text>
            <Text style={styles.detailValue}>{documento.fecha}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total:</Text>
            <Text style={styles.detailValue}>
              {documento.total.toLocaleString('es-PY', {
                style: 'currency',
                currency: 'PYG',
              })}
            </Text>
          </View>

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
