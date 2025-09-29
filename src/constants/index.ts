import { Cliente, Producto } from '../types';

export { Colors } from './colors';

export const menuItems = [
  { id: '6', title: 'Cerrar Sesión', action: 'logout' },
];

export const APP_CONFIG = {
  name: 'Facturación Electrónica',
  version: '1.0.0',
  company: 'Mi Empresa S.A.',
};

export const INVOICE_TYPES = {
  FACTURA: 'factura',
  NOTA_CREDITO: 'nota_credito',
  NOTA_DEBITO: 'nota_debito',
  COMPROBANTE_RETENCION: 'comprobante_retencion',
};

export const IVA_TYPES = {
  EXENTAS: 'exentas',
  IVA_5: 'iva5',
  IVA_10: 'iva10',
} as const;

export const PAYMENT_CONDITIONS = ['Contado', 'Crédito', 'Cheque'];

export const clientesEjemplo: Cliente[] = [
  {
    id: '1',
    nombre: 'Cliente Ejemplo 1',
    ruc: '12345678-9',
    direccion: 'Av. Principal 123',
  },
  {
    id: '2',
    nombre: 'Cliente Ejemplo 2',
    ruc: '87654321-0',
    direccion: 'Calle Secundaria 456',
  },
];

export const productosEjemplo: Producto[] = [
  {
    id: '1',
    codigo: 'PROD001',
    descripcion: 'Producto de Ejemplo 1',
    unidad: 'UNI',
    cantidad: 1,
    precio: 10000,
    iva: 'iva10',
  },
  {
    id: '2',
    codigo: 'PROD002',
    descripcion: 'Producto de Ejemplo 2',
    unidad: 'KG',
    cantidad: 1,
    precio: 5000,
    iva: 'iva5',
  },
  {
    id: '3',
    codigo: 'SERV001',
    descripcion: 'Servicio de Consultoría',
    unidad: 'UNI',
    cantidad: 1,
    precio: 50000,
    iva: 'exentas',
  },
];

export const userExample = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  company: 'Mi Empresa S.A.',
  phone: '1234567890',
  avatar: 'https://via.placeholder.com/150',
};
