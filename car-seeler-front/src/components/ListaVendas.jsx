import { useEffect, useState } from "react";

function ListaVendas() {

    const [vendas, setVendas] = useState([]);
    const [carros, setCarros] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [empregados, setEmpregados] = useState([]);

    const [novaVenda, setNovaVenda] = useState({
        idCarro: "",
        idCliente: "",
        idEmpregado: ""
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/vendas").then(res => res.json()),
            fetch("http://localhost:8080/carros").then(res => res.json()),
            fetch("http://localhost:8080/clientes").then(res => res.json()),
            fetch("http://localhost:8080/empregados").then(res => res.json())
        ]).then(([dadosVendas, dadosCarros, dadosClientes, dadosEmpregados]) => {
            setVendas(dadosVendas);
            setCarros(dadosCarros);
            setClientes(dadosClientes);
            setEmpregados(dadosEmpregados);
        }).catch(erro => console.log("Erro ao carregar dados:", erro));
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNovaVenda({ ...novaVenda, [name]: value });
    }

    function registrarVenda(event) {
        event.preventDefault();
        const vendaParaEnviar = {
            carro: { idCarro: novaVenda.idCarro },
            cliente: { idCliente: novaVenda.idCliente },
            empregado: { idEmpregado: novaVenda.idEmpregado }
        };

        fetch("http://localhost:8080/vendas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vendaParaEnviar)
        })
        .then(res => res.json())
        .then((vendaSalva) => {
            alert(`Venda realizada com sucesso! Valor Final: R$ ${vendaSalva.valorTotal} 💸`);           
            setVendas([...vendas, vendaSalva]);
            setNovaVenda({ idCarro: "", idCliente: "", idEmpregado: "" });
        })
        .catch(erro => alert("Erro ao registrar venda. Verifique se o carro já não foi vendido!"));
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-8 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Registrar Nova Venda</h3>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={registrarVenda}>
                    
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 font-bold mb-1">Veículo</label>
                        <select 
                            name="idCarro" 
                            className="border p-2 rounded bg-white focus:outline-none focus:ring-purple-400"
                            value={novaVenda.idCarro} onChange={handleInputChange} required
                        >
                            <option value="">Selecione um Carro...</option>
                            {carros.map(carro => (
                                <option key={carro.idCarro} value={carro.idCarro}>
                                    {carro.nome} ({carro.marca}) - R$ {carro.preco}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 font-bold mb-1">Cliente Comprador</label>
                        <select 
                            name="idCliente" 
                            className="border p-2 rounded bg-white focus:outline-none focus:ring-purple-400"
                            value={novaVenda.idCliente} onChange={handleInputChange} required
                        >
                            <option value="">Selecione um Cliente...</option>
                            {clientes.map(cli => (
                                <option key={cli.idCliente} value={cli.idCliente}>
                                    {cli.nomeCompleto} (CPF: {cli.cpf})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 font-bold mb-1">Vendedor Responsável</label>
                        <select 
                            name="idEmpregado" 
                            className="border p-2 rounded bg-white focus:outline-none focus:ring-purple-400"
                            value={novaVenda.idEmpregado} onChange={handleInputChange} required
                        >
                            <option value="">Selecione o Vendedor...</option>
                            {empregados.map(emp => (
                                <option key={emp.idEmpregado} value={emp.idEmpregado}>
                                    {emp.nomeCompleto}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="col-span-1 md:col-span-3 bg-purple-600 text-white p-3 rounded hover:bg-purple-700 font-bold transition text-lg mt-2">
                        Confirmar Venda
                    </button>
                </form>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Vendas</h2>

            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
                {vendas.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">Nenhuma venda registrada.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 font-semibold text-sm">ID</th>
                                <th className="py-3 px-4 font-semibold text-sm">Carro</th>
                                <th className="py-3 px-4 font-semibold text-sm">Cliente</th>
                                <th className="py-3 px-4 font-semibold text-sm">Vendedor</th>
                                <th className="py-3 px-4 font-semibold text-sm">Total</th>
                                <th className="py-3 px-4 font-semibold text-sm">Comissão</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {vendas.map((venda) => (
                                <tr key={venda.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-500">#{venda.id}</td>
                                    <td className="py-3 px-4 font-bold">{venda.carro?.nome}</td>
                                    <td className="py-3 px-4">{venda.cliente?.nomeCompleto}</td>
                                    <td className="py-3 px-4">{venda.empregado?.nomeCompleto}</td>
                                    <td className="py-3 px-4 text-green-600 font-bold">R$ {venda.valorTotal}</td>
                                    <td className="py-3 px-4 text-blue-600 text-sm">R$ {venda.valorComissao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default ListaVendas;