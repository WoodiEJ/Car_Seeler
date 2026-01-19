import { useEffect, useState } from "react";

function ListaClientes() {

    const [clientes, setClientes] = useState([]);
    const [novoCliente, setNovoCliente] = useState({
        nomeCompleto: "",
        cpf: "",
        dataNascimento: "",
        renda: ""
    });

    useEffect(() => {
        fetch("http://localhost:8080/clientes")
            .then((res) => res.json())
            .then((dados) => {
                setClientes(dados);
                console.log("Dados carregados: ", dados);
            }).catch((erro) => console.log("Erro ao buscar clientes: ", erro));
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNovoCliente({ ...novoCliente, [name]: value });
    }

    function excluirCliente(id) {
        if (confirm("Tem certeza que deseja excluir?")) {
            fetch(`http://localhost:8080/clientes/${id}`, {
                method: "DELETE",
            }).then(() => {
                alert("Cliente excluído!");
                setClientes(clientes.filter(cliente => cliente.idCliente !== id));
            }).catch(erro => alert("Erro ao excluir."));
        }
    }

    function cadastrarCliente(event) {
        event.preventDefault();
        if (confirm("Quer cadastrar este cliente?")) {

            fetch(`http://localhost:8080/clientes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoCliente)
            }).then((res) => res.json())
                .then((clienteSalvo) => {
                    alert("Cliente cadastrado com sucesso!");
                    setClientes([...clientes, clienteSalvo]);
                    setNovoCliente({ nomeCompleto: "", dataNascimento: "", renda: "" });
                }).catch(erro => alert("Erro ao registrar"))
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Cadastrar Novo Cliente</h3>

                <form className="grid grid-cols-2 gap-4" onSubmit={cadastrarCliente}>
                    <input
                        type="text" name="nomeCompleto" placeholder="Nome Completo"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCliente.nomeCompleto} onChange={handleInputChange} required
                    />

                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF (apenas números)"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCliente.cpf}
                        onChange={handleInputChange}
                        maxLength="14"
                        required
                    />

                    <input
                        type="date" name="dataNascimento"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCliente.dataNascimento} onChange={handleInputChange} required
                    />

                    <input
                        type="number" name="renda" placeholder="Renda Mensal (R$)"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoCliente.renda} onChange={handleInputChange} required
                    />

                    <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold transition">
                        Cadastrar Cliente
                    </button>
                </form>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Clientes Cadastrados</h2>

            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
                {clientes.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">Nenhum cliente encontrado.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">CPF</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Nome</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Nascimento</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Renda</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {clientes.map((cliente) => (
                                <tr key={cliente.idCliente} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">{cliente.nomeCompleto}</td>
                                    <td className="py-3 px-4 text-gray-600">{cliente.cpf}</td>
                                    <td className="py-3 px-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                                            {cliente.dataNascimento}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-green-600 font-mono">
                                        R$ {cliente.renda}
                                    </td>

                                    <td className="py-3 px-4 text-center">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded shadow transition"
                                            onClick={() => excluirCliente(cliente.idCliente)}
                                        >
                                            Excluir
                                        </button>
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

export default ListaClientes;