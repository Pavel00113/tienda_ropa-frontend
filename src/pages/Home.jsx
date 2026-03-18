import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductos } from '../services/productos.service';
import ProductoCard from '../components/productos/ProductoCard';
import ProductoCarousel from '../components/productos/ProductoCarousel';

export default function Home() {
  const [productos, setProductos]   = useState([]);
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [searchParams]              = useSearchParams();
  const categoria = searchParams.get('categoria');

  useEffect(() => {
    setLoading(true);
    getProductos({ categoria_id: categoria || undefined })
      .then(res => setProductos(res.data))
      .finally(() => setLoading(false));

    getProductos({ destacado: true })
      .then(res => setDestacados(res.data));
  }, [categoria]);

  return (
    <div className="max-w-6xl mx-auto">
      {!categoria && destacados.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Destacados</h2>
          <ProductoCarousel productos={destacados} />
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {categoria ? 'Productos' : 'Todos los productos'}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : productos.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No hay productos disponibles</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productos.map(p => <ProductoCard key={p.id} producto={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}