import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductoCard from './ProductoCard';

export default function ProductoCarousel({ productos }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    ref.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 -ml-4"
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
      </button>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {productos.map(p => (
          <div key={p.id} className="min-w-[220px]">
            <ProductoCard producto={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 -mr-4"
      >
        <ChevronRightIcon className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}