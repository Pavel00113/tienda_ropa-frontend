import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import useAuth from '../../hooks/useAuth';
import { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const { items, setOpen } = useContext(CarritoContext);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
        ATTOM STORE
      </Link>

      <div className="flex items-center gap-4">
        {usuario ? (
          <>
            <span className="text-sm text-gray-600">Hola, {usuario.nombre}</span>
            {usuario.rol === 'admin' && (
              <Link to="/admin" className="text-sm text-blue-600 hover:underline">
                Admin
              </Link>
            )}
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-full hover:bg-gray-700"
            >
              Registrarse
            </Link>
          </>
        )}

        <button
          onClick={() => setOpen(true)}
          className="relative p-2 hover:bg-gray-100 rounded-full"
        >
          <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}