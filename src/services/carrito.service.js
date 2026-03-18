import api from './api';

export const getCarrito       = ()         => api.get('/carrito');
export const addToCarrito     = (data)     => api.post('/carrito', data);
export const updateCarrito    = (id, data) => api.put(`/carrito/${id}`, data);
export const removeFromCarrito = (id)      => api.delete(`/carrito/${id}`);
export const clearCarrito     = ()         => api.delete('/carrito/clear');