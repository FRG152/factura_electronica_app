export interface Cliente {
  id: string;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono?: string;
  email?: string;
}

export interface Producto {
  id: string;
  codigo: string;
  descripcion: string;
  unidad: string;
  cantidad: number;
  precio: number;
  iva: 'exentas' | 'iva5' | 'iva10';
  categoria?: string;
}

export interface ItemFactura {
  id: string;
  producto: Producto;
  cantidad: number;
  precio: number;
  iva: 'exentas' | 'iva5' | 'iva10';
  subtotal: number;
}

export interface Factura {
  id: string;
  numero: string;
  fecha: string;
  cliente: Cliente;
  items: ItemFactura[];
  condicionPago: string;
  subtotalExentas: number;
  subtotalIva5: number;
  subtotalIva10: number;
  totalVenta: number;
  totalIVA: number;
  estado: 'borrador' | 'emitida' | 'anulada';
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  empresa: string;
  telefono?: string;
  avatar?: string;
}

export interface Empresa {
  id: string;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
  logo?: string;
}

export type Screen = 'Home' | 'Generate' | 'Profile';
export type AuthState = 'Login' | 'Authenticated';

// API Types for document listing
export interface ListarDocumentosParams {
  estado?: string;
  numeroDocumento?: string;
  cdc?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface RespuestaSet {
  id: number;
  'ns2:rEnviConsDeResponse': {
    $: {
      'xmlns:ns2': string;
    };
    'ns2:dCodRes': string;
    'ns2:dMsgRes': string;
    'ns2:dFecProc': string;
    'ns2:xContenDE': string;
  };
}

export interface Lote {
  id: number;
  numeroLote: string;
  cantidadDocumentos: number;
  estado: string;
  respuestaSet?: RespuestaSet;
  observaciones?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface DocumentoAPI {
  id: number;
  numeroDocumento: string;
  xmlOriginal: string;
  xmlFirmado: string;
  xmlConQR: string;
  cdc: string;
  loteId: number;
  estado: string;
  respuestaSet?: RespuestaSet;
  nombreArchivo: string;
  rutaArchivo: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  lote: Lote;
}

export interface ListarDocumentosResponse {
  documentos: DocumentoAPI[];
  paginacion: {
    page: string;
    limit: string;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
