export { Colors } from './colors';

export const menuItems = [
  { id: '1', title: 'Editar Perfil', icon: '👤', action: 'editProfile' },
  {
    id: '2',
    title: 'Configuración de Empresa',
    icon: '🏢',
    action: 'companySettings',
  },
  {
    id: '3',
    title: 'Configuración de Facturación',
    icon: '📄',
    action: 'billingSettings',
  },
  { id: '4', title: 'Notificaciones', icon: '🔔', action: 'notifications' },
  { id: '5', title: 'Ayuda y Soporte', icon: '❓', action: 'help' },
  { id: '6', title: 'Cerrar Sesión', icon: '🚪', action: 'logout' },
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

export const PAYMENT_CONDITIONS = [
  'Contado',
  'Crédito 15 días',
  'Crédito 30 días',
  'Crédito 60 días',
  'Crédito 90 días',
];
