import {
  Documento,
  Factura,
  Cliente,
  Producto,
  ListarDocumentosParams,
  ListarDocumentosResponse,
} from '../types';

const API_BASE_URL = 'http://e4o84c48gwg0ckcs04ws80cs.154.53.52.208.sslip.io';

const clientesMock: Cliente[] = [
  {
    id: '1',
    nombre: 'Cliente Ejemplo 1',
    ruc: '12345678-9',
    direccion: 'Av. Principal 123',
    telefono: '+595 21 123-4567',
    email: 'cliente1@ejemplo.com',
  },
  {
    id: '2',
    nombre: 'Cliente Ejemplo 2',
    ruc: '87654321-0',
    direccion: 'Calle Secundaria 456',
    telefono: '+595 21 234-5678',
    email: 'cliente2@ejemplo.com',
  },
];

const productosMock: Producto[] = [
  {
    id: '1',
    codigo: 'PROD001',
    descripcion: 'Producto de Ejemplo 1',
    unidad: 'UNI',
    cantidad: 1,
    precio: 10000,
    iva: 'iva10',
    categoria: 'Productos',
  },
  {
    id: '2',
    codigo: 'PROD002',
    descripcion: 'Producto de Ejemplo 2',
    unidad: 'KG',
    cantidad: 1,
    precio: 5000,
    iva: 'iva5',
    categoria: 'Productos',
  },
  {
    id: '3',
    codigo: 'SERV001',
    descripcion: 'Servicio de Consultoría',
    unidad: 'UNI',
    cantidad: 1,
    precio: 50000,
    iva: 'exentas',
    categoria: 'Servicios',
  },
];

export const documentService = {
  getDocumentos: async (
    params: ListarDocumentosParams = {},
  ): Promise<ListarDocumentosResponse> => {
    return await getListaDocumentos(params);
  },
  getDocumentosConFiltros: async (
    filtros: {
      estado?: string;
      numeroDocumento?: string;
      cdc?: string;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    } = {},
  ): Promise<ListarDocumentosResponse> => {
    return await getListaDocumentos(filtros);
  },
};

export const clientService = {
  getClientes: async (): Promise<Cliente[]> => {
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    return clientesMock;
  },

  searchClientes: async (query: string): Promise<Cliente[]> => {
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    const lowercaseQuery = query.toLowerCase();
    return clientesMock.filter(
      cliente =>
        cliente.nombre.toLowerCase().includes(lowercaseQuery) ||
        cliente.ruc.includes(query) ||
        cliente.email?.toLowerCase().includes(lowercaseQuery),
    );
  },

  getClienteById: async (id: string): Promise<Cliente | null> => {
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    return clientesMock.find(cliente => cliente.id === id) || null;
  },

  createCliente: async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    const newCliente: Cliente = {
      ...cliente,
      id: Date.now().toString(),
    };
    clientesMock.push(newCliente);
    return newCliente;
  },
};

export const productService = {
  getProductos: async (): Promise<Producto[]> => {
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    return productosMock;
  },

  // Buscar productos
  searchProductos: async (query: string): Promise<Producto[]> => {
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    const lowercaseQuery = query.toLowerCase();
    return productosMock.filter(
      producto =>
        producto.descripcion.toLowerCase().includes(lowercaseQuery) ||
        producto.codigo.toLowerCase().includes(lowercaseQuery) ||
        producto.categoria?.toLowerCase().includes(lowercaseQuery),
    );
  },

  getProductoById: async (id: string): Promise<Producto | null> => {
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    return productosMock.find(producto => producto.id === id) || null;
  },

  createProducto: async (producto: Omit<Producto, 'id'>): Promise<Producto> => {
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    const newProducto: Producto = {
      ...producto,
      id: Date.now().toString(),
    };
    productosMock.push(newProducto);
    return newProducto;
  },
};

export const invoiceService = {
  emitirFactura: async (
    factura: Omit<Factura, 'id' | 'numero'>,
  ): Promise<Factura> => {
    throw new Error('Función no implementada - usar API real');
  },

  anularFactura: async (id: string): Promise<boolean> => {
    throw new Error('Función no implementada - usar API real');
  },
};
export const getListaDocumentos = async (
  params: ListarDocumentosParams = {},
): Promise<ListarDocumentosResponse> => {
  try {
    const token = null;

    const queryParams = new URLSearchParams();
    if (params.estado) queryParams.append('estado', params.estado);
    if (params.numeroDocumento)
      queryParams.append('numeroDocumento', params.numeroDocumento);
    if (params.cdc) queryParams.append('cdc', params.cdc);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `${API_BASE_URL}/generar-documento/listar?${queryParams.toString()}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al listar documentos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al listar documentos:', error);
    throw error;
  }
};
