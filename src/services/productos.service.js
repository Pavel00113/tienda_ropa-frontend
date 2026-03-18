import api from './api';

export const getProductos  = (params) => api.get('/productos', { params });
export const getProducto   = (id)     => api.get(`/productos/${id}`);
export const getCategorias = (params) => api.get('/categorias', { params });
export const getCategoria  = (id)     => api.get(`/categorias/${id}`);