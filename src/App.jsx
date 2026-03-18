import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import useAuth from './hooks/useAuth';
import CarritoDrawer   from './components/carrito/CarritoDrawer';
import Navbar          from './components/layout/Navbar';
import Sidebar         from './components/layout/Sidebar';
import Footer          from './components/layout/Footer';
import Home            from './pages/Home';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito         from './pages/Carrito';
import Pedidos         from './pages/Pedidos';
import Login           from './pages/auth/Login';
import Register        from './pages/auth/Register';
import Dashboard       from './pages/admin/Dashboard';
import AdminProductos  from './pages/admin/Productos';
import AdminPedidos    from './pages/admin/Pedidos';

const ProtectedRoute = ({ children }) => {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { usuario } = useAuth();
  return usuario?.rol === 'admin' ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <CarritoProvider>
        <CarritoDrawer />
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 p-4">
              <Routes>
                <Route path="/"                element={<Home />} />
                <Route path="/producto/:id"    element={<ProductoDetalle />} />
                <Route path="/login"           element={<Login />} />
                <Route path="/register"        element={<Register />} />
                <Route path="/carrito"         element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
                <Route path="/pedidos"         element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
                <Route path="/admin"           element={<AdminRoute><Dashboard /></AdminRoute>} />
                <Route path="/admin/productos" element={<AdminRoute><AdminProductos /></AdminRoute>} />
                <Route path="/admin/pedidos"   element={<AdminRoute><AdminPedidos /></AdminRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </CarritoProvider>
    </BrowserRouter>
  );
}