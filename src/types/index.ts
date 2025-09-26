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

export interface Documento {
  id: string;
  tipo: string;
  numero: string;
  fecha: string;
  cliente: string;
  total: number;
  estado: string;
  archivo?: string;
}

export type Screen = 'Home' | 'Generate' | 'Profile';
export type AuthState = 'Login' | 'Authenticated';
