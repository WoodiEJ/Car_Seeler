import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaCarros from "./components/ListaCarros";
import Home from "./components/Home";
import ListaClientes from "./components/ListaClientes";
import ListaEmpregado from "./components/ListaEmpregado";
import ListaVendas from "./components/ListaVendas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carros" element={<ListaCarros />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/vendas" element={<ListaVendas />} />
        <Route path="/empregados" element={<ListaEmpregado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;