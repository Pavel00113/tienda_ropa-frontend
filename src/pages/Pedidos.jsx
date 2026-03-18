import { Link } from 'react-router-dom';

export default function Pedidos() {
  const numero = '51900188952';
  const mensaje = 'Hola, quiero consultar el estado de mi pedido';
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <p className="text-6xl mb-4">📦</p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Seguimiento de pedidos
      </h2>
      <p className="text-gray-400 mb-6">
        Consulta el estado de tu pedido por WhatsApp
      </p>
      <a href={url} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-full text-sm font-medium">
        Consultar por WhatsApp
      </a>
      <div className="mt-6">
        <Link to="/" className="text-sm text-gray-400 hover:text-gray-700">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
