export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} Motta Store — Todos los derechos reservados
    </footer>
  );
}