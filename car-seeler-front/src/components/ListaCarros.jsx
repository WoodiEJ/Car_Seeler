import { useEffect, useState } from "react";

function ListaCarros() {

    const [carros, setCarros] = useState([]);
    const [novoCarro, setNovoCarro] = useState({
        nome: "",
        marca: "",
        ano: "",
        preco: ""
    });

    useEffect(() => {
        fetch("http://localhost:8080/carros")
            .then((res) => res.json())
            .then((dados) => {
                setCarros(dados);
                console.log("Dados carregados: ", dados);
            }).catch((erro) => console.log("Erro ao buscar carros: ", erro));
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNovoCarro({ ...novoCarro, [name]: value });
    }

    function excluirCarro(id) {

        if (confirm("Tem certeza que deseja excluir?")) {

            fetch(`http://localhost:8080/carros/${id}`, {
                method: "DELETE",
            }).then(() => {
                alert("Carro excluído!");
                setCarros(carros.filter(carro => carro.idCarro !== id));
            }).catch(erro => alert("Erro ao excluir."));

        }
    }

    function cadastrarCarro(event) {
        event.preventDefault();

        if (confirm("Quer registrar um novo veículo?")) {

            fetch(`http://localhost:8080/carros`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoCarro)
            }).then((res) => res.json())
                .then((carroSalvo) => {
                    alert("Carro registrado! Pode olhar no estoque.");
                    setCarros([...carros, carroSalvo]);
                    setNovoCarro({ nome: "", marca: "", ano: "", preco: "" });
                }).catch(erro => alert("Erro ao registrar"))
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Cadastrar novo carro</h3>

                <form className="grid grid-cols-2 gap-4" onSubmit={cadastrarCarro}>
                    <input
                        type="text" name="nome" placeholder="Modelo (Ex: Civic)"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCarro.nome} onChange={handleInputChange} required
                    />

                    <input
                        type="text" name="marca" placeholder="Marca (Ex: Honda)"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCarro.marca} onChange={handleInputChange} required
                    />

                    <input
                        type="number" name="ano" placeholder="Ano"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCarro.ano} onChange={handleInputChange} required
                    />

                    <input
                        type="number" name="preco" placeholder="Preço"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCarro.preco} onChange={handleInputChange} required
                    />

                    <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded hovef:bg-green-600 font-bold transition">
                        Cadastrar Veículo
                    </button>
                </form>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Carros Disponíveis</h2>

            <div className="w-full max-2-4xl bg-white shadow-md rounded-lg overflow-hidden">
                {carros.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">Estoque Vazio</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Modelo</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Marca</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Ano</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Preço</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {carros.map((carro) => (
                                <tr key={carro.idCarro} className="border-b border-gray-200 hover:bg-gray-50 transition">

                                    <td className="py-3 px-4">{carro.nome}</td>
                                    <td className="py-3 px-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                                            {carro.marca}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{carro.ano}</td>
                                    <td className="py-3 px-4 font-mono font-medium text-green-600">R$ {carro.preco}</td>

                                    <td className="py-3 px-4 text-center">
                                        <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded shadow transition" onClick={() => excluirCarro(carro.idCarro)
                                        }>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )

}

export default ListaCarros;