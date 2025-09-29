import { ListarDocumentosParams, ListarDocumentosResponse } from '../types';

const API_BASE_URL = 'http://e4o84c48gwg0ckcs04ws80cs.154.53.52.208.sslip.io';

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
