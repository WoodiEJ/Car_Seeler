import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
          Car Seeler System 🚘
        </h1>
        <p className="text-gray-600">Gerencie sua concessionária em um só lugar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
        
        {/* CARD CARROS */}
        <Link to="/carros" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border-l-4 border-blue-500 group">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">Carros</h2>
              <p className="text-gray-500 mt-1">Gerencie o estoque de veículos</p>
            </div>
            <span className="text-4xl">🚗</span>
          </div>
        </Link>

        {/* CARD CLIENTES */}
        <Link to="/clientes" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border-l-4 border-green-500 group">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition">Clientes</h2>
              <p className="text-gray-500 mt-1">Cadastre seus compradores</p>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </Link>

        {/* CARD VENDAS */}
        <Link to="/vendas" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border-l-4 border-purple-500 group">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition">Vendas</h2>
              <p className="text-gray-500 mt-1">Registre novas vendas</p>
            </div>
            <span className="text-4xl">💸</span>
          </div>
        </Link>

        {/* CARD EMPREGADOS */}
        <Link to="/empregados" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border-l-4 border-orange-500 group">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition">Empregados</h2>
              <p className="text-gray-500 mt-1">Gerencie sua equipe</p>
            </div>
            <span className="text-4xl">👔</span>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Home;