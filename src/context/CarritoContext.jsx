import { createContext, useState, useEffect, useContext } from 'react';
import { getCarrito, addToCarrito, removeFromCarrito, clearCarrito } from '../services/carrito.service';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [items, setItems]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [open, setOpen]     = useState(false);

  const fetchCarrito = async () => {
    if (!usuario) return;
    try {
      const res = await getCarrito();
      setItems(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCarrito(); }, [usuario]);

  const agregar = async (inventario_id, cantidad = 1) => {
    await addToCarrito({ inventario_id, cantidad });
    fetchCarrito();
    setOpen(true);
  };

  const eliminar = async (id) => {
    await removeFromCarrito(id);
    fetchCarrito();
  };

  const vaciar = async () => {
    await clearCarrito();
    setItems([]);
    setTotal(0);
  };

  return (
    <CarritoContext.Provider value={{ items, total, open, setOpen, agregar, eliminar, vaciar, fetchCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};