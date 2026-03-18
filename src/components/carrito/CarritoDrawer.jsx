import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CarritoContext } from '../../context/CarritoContext';

export default function CarritoDrawer() {
  const { items, total, open, setOpen, eliminar, vaciar } = useContext(CarritoContext);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Carrito ({items.length})
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 items-start">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">👕</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.nombre}</p>
                  <p className="text-xs text-gray-400">Talla: {item.talla} · x{item.cantidad}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    S/ {(item.precio_oferta || item.precio) * item.cantidad}
                  </p>
                </div>
                <button
                  onClick={() => eliminar(item.id)}
                  className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total</span>
              <span className="font-bold text-gray-900">S/ {total}</span>
            </div>
            <Link
              to="/carrito"
              onClick={() => setOpen(false)}
              className="block w-full bg-gray-900 text-white text-center py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
              Ver carrito y pagar
            </Link>
            <button
              onClick={vaciar}
              className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}