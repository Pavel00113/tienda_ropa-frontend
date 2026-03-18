import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [form, setForm]           = useState({
    nombre: '', descripcion: '', precio: '', precio_oferta: '',
    categoria_id: '', destacado: false
  });
  const [editando, setEditando]   = useState(null);
  const [msg, setMsg]             = useState('');

  const fetchProductos = () => {
    api.get('/productos')
      .then(res => setProductos(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProductos(); }, []);

  const handleChange = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editando) {
        await api.put(`/productos/${editando}`, form);
        setMsg('✓ Producto actualizado');
      } else {
        await api.post('/productos', form);
        setMsg('✓ Producto creado');
      }
      setForm({ nombre: '', descripcion: '', precio: '', precio_oferta: '', categoria_id: '', destacado: false });
      setEditando(null);
      fetchProductos();
    } catch {
      setMsg('Error al guardar');
    }
  };

  const handleEditar = p => {
    setEditando(p.id);
    setForm({
      nombre: p.nombre, descripcion: p.descripcion || '',
      precio: p.precio, precio_oferta: p.precio_oferta || '',
      categoria_id: p.categoria_id || '', destacado: p.destacado
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async id => {
    if (!confirm('¿Eliminar este producto?')) return;
    await api.delete(`/productos/${id}`);
    fetchProductos();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {editando ? 'Editar producto' : 'Nuevo producto'}
      </h1>

      {/* Formulario */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
        {msg && (
          <div className={`text-sm px-4 py-2 rounded-lg mb-4 ${
            msg.includes('✓') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {msg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select name="categoria_id" value={form.categoria_id} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
              <option value="">Sin categoría</option>
              <option value="1">Hombre - Casacas</option>
              <option value="2">Hombre - Polares</option>
              <option value="3">Hombre - Pantalones</option>
              <option value="4">Hombre - Zapatillas</option>
              <option value="5">Mujer - Casacas</option>
              <option value="6">Accesorios</option>
              <option value="7">Ofertas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
            <input name="precio" type="number" value={form.precio} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio oferta</label>
            <input name="precio_oferta" type="number" value={form.precio_oferta} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="destacado" id="destacado"
              checked={form.destacado} onChange={handleChange}
              className="w-4 h-4 accent-gray-900" />
            <label htmlFor="destacado" className="text-sm text-gray-700">Producto destacado</label>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-700">
              {editando ? 'Actualizar' : 'Crear producto'}
            </button>
            {editando && (
              <button type="button" onClick={() => { setEditando(null); setForm({ nombre: '', descripcion: '', precio: '', precio_oferta: '', categoria_id: '', destacado: false }); }}
                className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm hover:bg-gray-50">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de productos */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Productos ({productos.length})</h2>
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-16 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {productos.map(p => (
            <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                {p.imagen_principal
                  ? <img src={p.imagen_principal} alt={p.nombre} className="w-full h-full object-cover rounded-lg" />
                  : <span className="text-xl">👕</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{p.nombre}</p>
                <p className="text-sm text-gray-400">{p.categoria_nombre} · S/ {p.precio}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditar(p)}
                  className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Editar
                </button>
                <button onClick={() => handleEliminar(p.id)}
                  className="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}