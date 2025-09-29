import {
  Text,
  View,
  Alert,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Cliente, Producto, ItemFactura } from '../types';
import { Plus, Search, Trash2, FileText } from 'lucide-react-native';
import {
  clientesEjemplo,
  Colors,
  productosEjemplo,
  PAYMENT_CONDITIONS,
} from '../constants';

const GenerateInvoiceScreen: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [condicionPago, setCondicionPago] = useState('Contado');
  const [items, setItems] = useState<ItemFactura[]>([]);
  const [mostrarBuscarCliente, setMostrarBuscarCliente] = useState(false);
  const [mostrarBuscarProducto, setMostrarBuscarProducto] = useState(false);
  const [mostrarSelectCondicionPago, setMostrarSelectCondicionPago] =
    useState(false);
  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [busquedaProducto, setBusquedaProducto] = useState('');

  const agregarItem = (producto: Producto) => {
    const nuevoItem: ItemFactura = {
      id: Date.now().toString(),
      producto,
      cantidad: 1,
      precio: producto.precio,
      iva: producto.iva,
      subtotal: producto.precio,
    };
    setItems([...items, nuevoItem]);
    setMostrarBuscarProducto(false);
  };

  const eliminarItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return { ...item, cantidad, subtotal: cantidad * item.precio };
        }
        return item;
      }),
    );
  };

  const actualizarPrecio = (id: string, precio: number) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return { ...item, precio, subtotal: item.cantidad * precio };
        }
        return item;
      }),
    );
  };

  const actualizarIVA = (id: string, iva: 'exentas' | 'iva5' | 'iva10') => {
    setItems(items.map(item => (item.id === id ? { ...item, iva } : item)));
  };

  const calcularTotales = () => {
    let subtotalExentas = 0;
    let subtotalIva5 = 0;
    let subtotalIva10 = 0;
    let totalCantidad = 0;

    items.forEach(item => {
      const subtotal = item.cantidad * item.precio;
      totalCantidad += item.cantidad;

      switch (item.iva) {
        case 'exentas':
          subtotalExentas += subtotal;
          break;
        case 'iva5':
          subtotalIva5 += subtotal;
          break;
        case 'iva10':
          subtotalIva10 += subtotal;
          break;
      }
    });

    const totalVenta = subtotalExentas + subtotalIva5 + subtotalIva10;
    const totalIVA = subtotalIva5 * 0.05 + subtotalIva10 * 0.1;

    return {
      totalCantidad,
      subtotalExentas,
      subtotalIva5,
      subtotalIva10,
      totalVenta,
      totalIVA,
    };
  };

  const emitirFactura = () => {
    if (!cliente) {
      Alert.alert('Error', 'Debe seleccionar un cliente');
      return;
    }
    if (items.length === 0) {
      Alert.alert('Error', 'Debe agregar al menos un producto');
      return;
    }

    Alert.alert('Éxito', 'Factura emitida correctamente');
  };

  const totales = calcularTotales();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Generar Factura</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información del Cliente</Text>

        <View style={styles.clientColumn}>
          <View style={styles.clientField}>
            <Text style={styles.label}>Cliente</Text>
            <TouchableOpacity
              style={styles.clientInput}
              onPress={() => setMostrarBuscarCliente(true)}
            >
              <Text style={styles.clientText}>
                {cliente ? cliente.nombre : 'Nombre del cliente'}
              </Text>
              <Search size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentField}>
            <Text style={styles.label}>Condición de pago</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setMostrarSelectCondicionPago(true)}
            >
              <Text style={styles.dropdownText}>{condicionPago}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Productos */}
      <View style={styles.section}>
        <View style={styles.buttonsColumn}>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color={Colors.white} />
            <Text style={styles.addButtonText}>Agregar Producto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setMostrarBuscarProducto(true)}
          >
            <Search size={20} color={Colors.primary} />
            <Text style={styles.searchButtonText}>Buscar Producto</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Items */}
        {items.length > 0 && (
          <View style={styles.itemsContainer}>
            {items.map((item, index) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemNumber}>#{index + 1}</Text>
                    <Text style={styles.itemCode}>{item.producto.codigo}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteItemButton}
                    onPress={() => eliminarItem(item.id)}
                  >
                    <Trash2 size={18} color={Colors.error} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemDescription}>
                  {item.producto.descripcion}
                </Text>
                <Text style={styles.itemUnit}>
                  Unidad: {item.producto.unidad}
                </Text>

                <View style={styles.itemControls}>
                  <View style={styles.quantitySection}>
                    <Text style={styles.controlLabel}>Cantidad</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          actualizarCantidad(
                            item.id,
                            Math.max(1, item.cantidad - 1),
                          )
                        }
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityValue}>{item.cantidad}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          actualizarCantidad(item.id, item.cantidad + 1)
                        }
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.priceSection}>
                    <Text style={styles.controlLabel}>Precio</Text>
                    <TextInput
                      style={styles.priceInput}
                      value={item.precio.toString()}
                      onChangeText={text =>
                        actualizarPrecio(item.id, parseFloat(text) || 0)
                      }
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                </View>

                <View style={styles.ivaSection}>
                  <Text style={styles.controlLabel}>Tipo de IVA</Text>
                  <View style={styles.ivaOptions}>
                    <TouchableOpacity
                      style={[
                        styles.ivaOption,
                        item.iva === 'exentas' && styles.ivaOptionSelected,
                      ]}
                      onPress={() => actualizarIVA(item.id, 'exentas')}
                    >
                      <View
                        style={[
                          styles.radioButton,
                          item.iva === 'exentas' && styles.radioButtonSelected,
                        ]}
                      />
                      <Text
                        style={[
                          styles.ivaOptionText,
                          item.iva === 'exentas' &&
                            styles.ivaOptionTextSelected,
                        ]}
                      >
                        Exentas
                      </Text>
                      <Text style={styles.ivaAmount}>
                        {item.iva === 'exentas'
                          ? (item.cantidad * item.precio).toLocaleString()
                          : '0'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.ivaOption,
                        item.iva === 'iva5' && styles.ivaOptionSelected,
                      ]}
                      onPress={() => actualizarIVA(item.id, 'iva5')}
                    >
                      <View
                        style={[
                          styles.radioButton,
                          item.iva === 'iva5' && styles.radioButtonSelected,
                        ]}
                      />
                      <Text
                        style={[
                          styles.ivaOptionText,
                          item.iva === 'iva5' && styles.ivaOptionTextSelected,
                        ]}
                      >
                        IVA 5%
                      </Text>
                      <Text style={styles.ivaAmount}>
                        {item.iva === 'iva5'
                          ? (item.cantidad * item.precio).toLocaleString()
                          : '0'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.ivaOption,
                        item.iva === 'iva10' && styles.ivaOptionSelected,
                      ]}
                      onPress={() => actualizarIVA(item.id, 'iva10')}
                    >
                      <View
                        style={[
                          styles.radioButton,
                          item.iva === 'iva10' && styles.radioButtonSelected,
                        ]}
                      />
                      <Text
                        style={[
                          styles.ivaOptionText,
                          item.iva === 'iva10' && styles.ivaOptionTextSelected,
                        ]}
                      >
                        IVA 10%
                      </Text>
                      <Text style={styles.ivaAmount}>
                        {item.iva === 'iva10'
                          ? (item.cantidad * item.precio).toLocaleString()
                          : '0'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.itemTotal}>
                  <Text style={styles.itemTotalLabel}>Subtotal:</Text>
                  <Text style={styles.itemTotalValue}>
                    {(item.cantidad * item.precio).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Totales */}
      <View style={styles.section}>
        <View style={styles.totalsContainer}>
          <View style={styles.totalItem}>
            <Text style={styles.totalLabel}>Cantidad Total</Text>
            <Text style={styles.totalValue}>
              {totales.totalCantidad.toFixed(2)}
            </Text>
          </View>

          <View style={styles.subtotals}>
            <Text style={styles.subtotalLabel}>Subtotal:</Text>
            <Text style={styles.subtotalItem}>
              Exentas: {totales.subtotalExentas}
            </Text>
            <Text style={styles.subtotalItem}>
              IVA 5%: {totales.subtotalIva5}
            </Text>
            <Text style={styles.subtotalItem}>
              IVA 10%: {totales.subtotalIva10}
            </Text>
          </View>

          <View style={styles.finalTotals}>
            <View style={styles.totalRow}>
              <Text style={styles.finalTotalLabel}>Total Venta</Text>
              <Text style={styles.finalTotalValue}>{totales.totalVenta}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.finalTotalLabel}>Total IVA</Text>
              <Text style={styles.finalTotalValue}>
                {totales.totalIVA.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emitButton} onPress={emitirFactura}>
          <FileText size={20} color={Colors.white} />
          <Text style={styles.emitButtonText}>Emitir Factura</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Buscar Cliente */}
      <Modal
        visible={mostrarBuscarCliente}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMostrarBuscarCliente(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Search size={20} color={Colors.primary} />
                <Text style={styles.modalTitle}>Buscar Cliente</Text>
              </View>
              <TouchableOpacity onPress={() => setMostrarBuscarCliente(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre o RUC..."
              value={busquedaCliente}
              onChangeText={setBusquedaCliente}
            />

            <FlatList
              data={clientesEjemplo.filter(
                cliente =>
                  cliente.nombre
                    .toLowerCase()
                    .includes(busquedaCliente.toLowerCase()) ||
                  cliente.ruc.includes(busquedaCliente),
              )}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.clientCard}
                  onPress={() => {
                    setCliente(item);
                    setMostrarBuscarCliente(false);
                  }}
                >
                  <Text style={styles.clientCardName}>{item.nombre}</Text>
                  <Text style={styles.clientCardRuc}>RUC: {item.ruc}</Text>
                  <Text style={styles.clientCardAddress}>{item.direccion}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Buscar Producto */}
      <Modal
        visible={mostrarBuscarProducto}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMostrarBuscarProducto(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Search size={20} color={Colors.primary} />
                <Text style={styles.modalTitle}>
                  Buscar Producto o Servicio
                </Text>
              </View>
              <TouchableOpacity onPress={() => setMostrarBuscarProducto(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por código o descripción..."
              value={busquedaProducto}
              onChangeText={setBusquedaProducto}
            />

            <FlatList
              data={productosEjemplo.filter(
                producto =>
                  producto.descripcion
                    .toLowerCase()
                    .includes(busquedaProducto.toLowerCase()) ||
                  producto.codigo
                    .toLowerCase()
                    .includes(busquedaProducto.toLowerCase()),
              )}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.productCard}
                  onPress={() => agregarItem(item)}
                >
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.descripcion}</Text>
                    <Text style={styles.productDetails}>
                      Código: {item.codigo} | Unidad: {item.unidad}
                    </Text>
                    <Text style={styles.productPrice}>
                      Precio: {item.precio.toLocaleString()} | IVA: {item.iva}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.addProductButton}>
                    <Plus size={20} color={Colors.white} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Seleccionar Condición de Pago */}
      <Modal
        visible={mostrarSelectCondicionPago}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMostrarSelectCondicionPago(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Seleccionar Condición de Pago
              </Text>
              <TouchableOpacity
                onPress={() => setMostrarSelectCondicionPago(false)}
              >
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={PAYMENT_CONDITIONS}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.paymentOption,
                    condicionPago === item && styles.paymentOptionSelected,
                  ]}
                  onPress={() => {
                    setCondicionPago(item);
                    setMostrarSelectCondicionPago(false);
                  }}
                >
                  <Text
                    style={[
                      styles.paymentOptionText,
                      condicionPago === item &&
                        styles.paymentOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {condicionPago === item && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  clientColumn: {
    flexDirection: 'column',
    gap: 15,
  },
  clientField: {
    flex: 2,
  },
  paymentField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  clientInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  clientText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.text,
  },
  dropdownArrow: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  buttonsColumn: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 20,
  },
  addButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  searchButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  searchButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  itemsContainer: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  itemCode: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  deleteItemButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: Colors.background,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  itemControls: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  quantitySection: {
    flex: 1,
  },
  priceSection: {
    flex: 1,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    minWidth: 30,
    textAlign: 'center',
  },
  priceInput: {
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    textAlign: 'center',
    backgroundColor: Colors.background,
  },
  ivaSection: {
    marginBottom: 16,
  },
  ivaOptions: {
    gap: 8,
  },
  ivaOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    gap: 12,
  },
  ivaOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  radioButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  ivaOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
  },
  ivaOptionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  ivaAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    minWidth: 80,
    textAlign: 'right',
  },
  itemTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  itemTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  totalsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  subtotals: {
    marginBottom: 16,
  },
  subtotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  subtotalItem: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  finalTotals: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  finalTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    gap: 15,
  },
  cancelButton: {
    backgroundColor: Colors.border,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  emitButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  emitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
  searchInput: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  clientCard: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  clientCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  clientCardRuc: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  clientCardAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  addProductButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  paymentOptionSelected: {
    backgroundColor: Colors.primary + '10',
    borderColor: Colors.primary,
  },
  paymentOptionText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  paymentOptionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default GenerateInvoiceScreen;
