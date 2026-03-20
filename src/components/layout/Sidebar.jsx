import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const menu = [
  {
    label: 'Hombre',
    items: [
      { label: 'Casacas',    href: '/?categoria=1' },
      { label: 'Polares',    href: '/?categoria=2' },
      { label: 'Pantalones', href: '/?categoria=3' },
      { label: 'Zapatillas', href: '/?categoria=4' },
    ],
  },
  {
    label: 'Mujer',
    items: [{ label: 'Casacas', href: '/?categoria=5' }],
  },
  {
    label: 'Otros',
    items: [
      { label: 'Accesorios', href: '/?categoria=6' },
      { label: 'Ofertas',    href: '/?categoria=7' },
    ],
  },
];

export default function Sidebar() {
  const [abiertos, setAbiertos] = useState({ Hombre: true });
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const location = useLocation();

  const toggle = (label) =>
    setAbiertos(prev => ({ ...prev, [label]: !prev[label] }));

  const Contenido = () => (
    <>
      {menu.map(grupo => (
        <div key={grupo.label} className="mb-2">
          <button onClick={() => toggle(grupo.label)}
            className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 py-2 hover:text-gray-900">
            {grupo.label}
            {abiertos[grupo.label]
              ? <ChevronDownIcon className="w-4 h-4" />
              : <ChevronRightIcon className="w-4 h-4" />}
          </button>
          {abiertos[grupo.label] && (
            <ul className="ml-3 border-l border-gray-100 pl-3 space-y-1">
              {grupo.items.map(item => (
                <li key={item.label}>
                  <Link to={item.href}
                    onClick={() => setSidebarAbierto(false)}
                    className={`block text-sm py-1 rounded px-2 transition-colors ${
                      location.search === '?' + item.href.split('?')[1]
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Botón hamburguesa — solo mobile */}
      <button onClick={() => setSidebarAbierto(true)}
        className="fixed top-4 left-4 z-40 md:hidden bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
        <Bars3Icon className="w-5 h-5 text-gray-700" />
      </button>

      {/* Overlay — mobile */}
      {sidebarAbierto && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarAbierto(false)} />
      )}

      {/* Sidebar mobile (drawer) */}
      <aside className={`fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-200 py-6 px-4 z-50 transform transition-transform duration-300 md:hidden ${
        sidebarAbierto ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Categorías</p>
          <button onClick={() => setSidebarAbierto(false)}>
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <Contenido />
      </aside>

      {/* Sidebar desktop */}
      <aside className="hidden md:block w-56 min-h-screen bg-white border-r border-gray-200 py-6 px-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Categorías</p>
        <Contenido />
      </aside>
    </>
  );
}