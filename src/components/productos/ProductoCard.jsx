import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';

export default function ProductoCard({ producto }) {
  const { agregar } = useContext(CarritoContext);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <Link to={`/producto/${producto.id}`}>
        <div className="aspect-square bg-gray-50 overflow-hidden">
          {producto.imagen_principal ? (
            <img
              src={producto.imagen_principal}
              alt={producto.nombre}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
              👕
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/producto/${producto.id}`}>
          <p className="text-sm font-medium text-gray-800 truncate hover:text-gray-600">
            {producto.nombre}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div>
            {producto.precio_oferta ? (
              <>
                <span className="text-sm font-bold text-red-500">
                  S/ {producto.precio_oferta}
                </span>
                <span className="text-xs text-gray-400 line-through ml-1">
                  S/ {producto.precio}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-gray-900">
                S/ {producto.precio}
              </span>
            )}
          </div>
          <button
            onClick={() => agregar(1, 1)}
            className="text-xs bg-gray-900 text-white px-3 py-1 rounded-full hover:bg-gray-700"
          >
            + Añadir
          </button>
        </div>
      </div>
    </div>
  );
}