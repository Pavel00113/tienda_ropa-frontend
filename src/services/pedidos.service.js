import api from './api';

export const getMisPedidos = ()     => api.get('/pedidos');
export const getPedido     = (id)   => api.get(`/pedidos/${id}`);
export const createPedido  = (data) => api.post('/pedidos', data);
export const cancelarPedido = (id)  => api.put(`/pedidos/${id}/cancelar`);