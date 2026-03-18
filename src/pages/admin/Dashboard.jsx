import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-xl h-24 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Clientes</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.total_clientes}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Pedidos</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.total_pedidos}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Productos</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.total_productos}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Ingresos</p>
          <p className="text-3xl font-bold text-gray-900">S/ {stats?.ingresos_totales}</p>
        </div>
      </div>

      {/* Pedidos por estado */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Pedidos por estado</h2>
        <div className="flex flex-wrap gap-3">
          {stats?.pedidos_por_estado?.map(e => (
            <div key={e.estado} className="px-4 py-2 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-400 capitalize">{e.estado}</span>
              <p className="text-lg font-bold text-gray-900">{e.cantidad}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/admin/productos"
          className="bg-gray-900 text-white rounded-xl p-6 hover:bg-gray-700 transition-colors"
        >
          <p className="text-2xl mb-2">👕</p>
          <p className="font-semibold">Gestionar productos</p>
          <p className="text-xs text-gray-400 mt-1">Agregar, editar o eliminar</p>
        </Link>
        <Link
          to="/admin/pedidos"
          className="bg-white border border-gray-100 rounded-xl p-6 hover:border-gray-300 transition-colors"
        >
          <p className="text-2xl mb-2">📦</p>
          <p className="font-semibold text-gray-900">Ver pedidos</p>
          <p className="text-xs text-gray-400 mt-1">Gestionar estados</p>
        </Link>
      </div>
    </div>
  );
}