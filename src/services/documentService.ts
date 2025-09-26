import { Documento, Factura, Cliente, Producto } from '../types';

// Simulación de datos - en una app real esto vendría de una API
const documentosMock: Documento[] = [
  {
    id: '1',
    tipo: 'Factura',
    numero: '001-001-0000001',
    fecha: '2024-01-15',
    cliente: 'Cliente Ejemplo 1',
    total: 150000,
    estado: 'emitida',
  },
  {
    id: '2',
    tipo: 'Nota de Crédito',
    numero: '001-001-0000002',
    fecha: '2024-01-16',
    cliente: 'Cliente Ejemplo 2',
    total: 25000,
    estado: 'borrador',
  },
  {
    id: '3',
    tipo: 'Factura',
    numero: '001-001-0000003',
    fecha: '2024-01-17',
    cliente: 'Cliente Ejemplo 3',
    total: 75000,
    estado: 'emitida',
  },
];

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
  // Obtener todos los documentos
  getDocumentos: async (): Promise<Documento[]> => {
    // Simular delay de API
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    return documentosMock;
  },

  // Obtener documento por ID
  getDocumentoById: async (id: string): Promise<Documento | null> => {
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    return documentosMock.find(doc => doc.id === id) || null;
  },

  // Crear nuevo documento
  createDocumento: async (
    documento: Omit<Documento, 'id'>,
  ): Promise<Documento> => {
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    const newDocumento: Documento = {
      ...documento,
      id: Date.now().toString(),
    };
    documentosMock.push(newDocumento);
    return newDocumento;
  },

  // Actualizar documento
  updateDocumento: async (
    id: string,
    updates: Partial<Documento>,
  ): Promise<Documento | null> => {
    await new Promise<void>(resolve => setTimeout(resolve, 600));
    const index = documentosMock.findIndex(doc => doc.id === id);
    if (index !== -1) {
      documentosMock[index] = { ...documentosMock[index], ...updates };
      return documentosMock[index];
    }
    return null;
  },

  // Eliminar documento
  deleteDocumento: async (id: string): Promise<boolean> => {
    await new Promise<void>(resolve => setTimeout(resolve, 400));
    const index = documentosMock.findIndex(doc => doc.id === id);
    if (index !== -1) {
      documentosMock.splice(index, 1);
      return true;
    }
    return false;
  },
};

export const clientService = {
  // Obtener todos los clientes
  getClientes: async (): Promise<Cliente[]> => {
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    return clientesMock;
  },

  // Buscar clientes
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

  // Obtener cliente por ID
  getClienteById: async (id: string): Promise<Cliente | null> => {
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    return clientesMock.find(cliente => cliente.id === id) || null;
  },

  // Crear nuevo cliente
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
  // Obtener todos los productos
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

  // Obtener producto por ID
  getProductoById: async (id: string): Promise<Producto | null> => {
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    return productosMock.find(producto => producto.id === id) || null;
  },

  // Crear nuevo producto
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
  // Emitir factura
  emitirFactura: async (
    factura: Omit<Factura, 'id' | 'numero'>,
  ): Promise<Factura> => {
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    // Generar número de factura (en una app real esto vendría del backend)
    const numero = `001-001-${String(Date.now()).slice(-7)}`;

    const newFactura: Factura = {
      ...factura,
      id: Date.now().toString(),
      numero,
      estado: 'emitida',
    };

    // Agregar a la lista de documentos
    const documento: Documento = {
      id: newFactura.id,
      tipo: 'Factura',
      numero: newFactura.numero,
      fecha: newFactura.fecha,
      cliente: newFactura.cliente.nombre,
      total: newFactura.totalVenta,
      estado: newFactura.estado,
    };

    documentosMock.unshift(documento);

    return newFactura;
  },

  // Anular factura
  anularFactura: async (id: string): Promise<boolean> => {
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    const index = documentosMock.findIndex(doc => doc.id === id);
    if (index !== -1) {
      documentosMock[index].estado = 'anulada';
      return true;
    }
    return false;
  },
};
