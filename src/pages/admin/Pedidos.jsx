import { useEffect, useState } from 'react';
import api from '../../services/api';

const ESTADOS = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];

const colores = {
  pendiente:  'bg-yellow-100 text-yellow-700',
  pagado:     'bg-blue-100 text-blue-700',
  enviado:    'bg-purple-100 text-purple-700',
  entregado:  'bg-green-100 text-green-700',
  cancelado:  'bg-red-100 text-red-700',
};

export default function AdminPedidos() {
  const [pedidos, setPedidos]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filtro, setFiltro]     = useState('');

  const fetchPedidos = () => {
    const params = filtro ? { estado: filtro } : {};
    api.get('/admin/pedidos', { params })
      .then(res => setPedidos(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPedidos(); }, [filtro]);

  const cambiarEstado = async (id, estado) => {
    await api.put(`/admin/pedidos/${id}/estado`, { estado });
    fetchPedidos();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pedidos</h1>

      {/* Filtro */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFiltro('')}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            filtro === '' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
        {ESTADOS.map(e => (
          <button
            key={e}
            onClick={() => setFiltro(e)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors ${
              filtro === e ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-20 animate-pulse" />
          ))}
        </div>
      ) : pedidos.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No hay pedidos</p>
      ) : (
        <div className="space-y-3">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(pedido.created_at).toLocaleDateString('es-PE', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                  <p className="font-medium text-gray-800">{pedido.cliente}</p>
                  <p className="text-xs text-gray-400">{pedido.email}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">S/ {pedido.total}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${colores[pedido.estado]}`}>
                    {pedido.estado}
                  </span>
                  <select
                    value={pedido.estado}
                    onChange={e => cambiarEstado(pedido.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    {ESTADOS.map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}