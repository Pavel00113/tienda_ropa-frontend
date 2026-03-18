import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
    items: [
      { label: 'Casacas', href: '/?categoria=5' },
    ],
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
  const location = useLocation();

  const toggle = (label) =>
    setAbiertos((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 py-6 px-4 hidden md:block">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Categorías
      </p>

      {menu.map((grupo) => (
        <div key={grupo.label} className="mb-2">
          <button
            onClick={() => toggle(grupo.label)}
            className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 py-2 hover:text-gray-900"
          >
            {grupo.label}
            {abiertos[grupo.label]
              ? <ChevronDownIcon className="w-4 h-4" />
              : <ChevronRightIcon className="w-4 h-4" />
            }
          </button>

          {abiertos[grupo.label] && (
            <ul className="ml-3 border-l border-gray-100 pl-3 space-y-1">
              {grupo.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`block text-sm py-1 rounded px-2 transition-colors ${
                      location.search === item.href.split('?')[1]
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}