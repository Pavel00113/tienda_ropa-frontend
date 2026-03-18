import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { TrashIcon } from '@heroicons/react/24/outline';

const TU_WHATSAPP = '+51900188952'; // ← pon tu número con código de país (51 = Perú)

export default function Carrito() {
  const { items, total, eliminar, vaciar } = useContext(CarritoContext);
  const navigate = useNavigate();

  const generarMensajeWhatsApp = () => {
    if (items.length === 0) return;

    const lineas = items.map(item =>
      `• ${item.nombre} | Talla: ${item.talla} | x${item.cantidad} | S/ ${(item.precio_oferta || item.precio) * item.cantidad}`
    );

    const mensaje = [
      '🛍️ *Hola, quiero hacer un pedido:*',
      '',
      ...lineas,
      '',
      `*Total: S/ ${total}*`,
      '',
      '¿Cómo procedo con el pago y envío?'
    ].join('\n');

    const url = `https://wa.me/${TU_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <p className="text-6xl mb-4">🛒</p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Tu carrito está vacío</h2>
      <p className="text-gray-400 mb-6">Agrega productos para continuar</p>
      <Link
        to="/"
        className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700"
      >
        Ver productos
      </Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tu carrito</h1>

      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              {item.imagen ? (
                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">👕</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800">{item.nombre}</p>
              <p className="text-sm text-gray-400">Talla: {item.talla} · Color: {item.color || 'Único'}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                S/ {(item.precio_oferta || item.precio) * item.cantidad}
                <span className="font-normal text-gray-400 ml-1">x{item.cantidad}</span>
              </p>
            </div>

            <button
              onClick={() => eliminar(item.id)}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal ({items.length} productos)</span>
          <span className="font-medium">S/ {total}</span>
        </div>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <span className="text-gray-600">Envío</span>
          <span className="text-sm text-gray-400">A coordinar</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">S/ {total}</span>
        </div>

        <button
          onClick={generarMensajeWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Pedir por WhatsApp
        </button>

        <button
          onClick={vaciar}
          className="w-full mt-3 text-sm text-gray-400 hover:text-red-500 transition-colors py-2"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}