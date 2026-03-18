import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducto } from '../services/productos.service';
import { CarritoContext } from '../context/CarritoContext';
import useAuth from '../hooks/useAuth';

export default function ProductoDetalle() {
  const { id }                      = useParams();
  const [producto, setProducto]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [tallaSeleccionada, setTalla] = useState(null);
  const [agregando, setAgregando]   = useState(false);
  const [msg, setMsg]               = useState('');
  const { agregar }                 = useContext(CarritoContext);
  const { usuario }                 = useAuth();
  const navigate                    = useNavigate();

  useEffect(() => {
    getProducto(id)
      .then(res => setProducto(res.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAgregar = async () => {
    if (!usuario) return navigate('/login');
    if (!tallaSeleccionada) return setMsg('Selecciona una talla');

    const invItem = producto.inventario.find(
      i => i.talla === tallaSeleccionada && i.stock > 0
    );
    if (!invItem) return setMsg('Sin stock para esa talla');

    setAgregando(true);
    try {
      await agregar(invItem.id, 1);
      setMsg('✓ Agregado al carrito');
    } catch {
      setMsg('Error al agregar');
    } finally {
      setAgregando(false);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-100 rounded animate-pulse" />
          <div className="h-6 bg-gray-100 rounded w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (!producto) return null;

  const tallasDisponibles = producto.inventario?.filter(i => i.stock > 0) || [];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Imagen */}
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          {producto.imagenes?.[0]?.url ? (
            <img
              src={producto.imagenes[0].url}
              alt={producto.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">
              👕
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">
              {producto.categoria_nombre}
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {producto.nombre}
            </h1>

            <div className="mb-4">
              {producto.precio_oferta ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-500">
                    S/ {producto.precio_oferta}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    S/ {producto.precio}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  S/ {producto.precio}
                </span>
              )}
            </div>

            {producto.descripcion && (
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {producto.descripcion}
              </p>
            )}

            {/* Tallas */}
            {tallasDisponibles.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Talla</p>
                <div className="flex gap-2 flex-wrap">
                  {tallasDisponibles.map(inv => (
                    <button
                      key={inv.id}
                      onClick={() => { setTalla(inv.talla); setMsg(''); }}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        tallaSeleccionada === inv.talla
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-200 text-gray-700 hover:border-gray-900'
                      }`}
                    >
                      {inv.talla}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {msg && (
              <p className={`text-sm mb-3 ${msg.includes('✓') ? 'text-green-600' : 'text-red-500'}`}>
                {msg}
              </p>
            )}
            <button
              onClick={handleAgregar}
              disabled={agregando}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              {agregando ? 'Agregando...' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}