import { useEffect, useState } from "react";

function ListaEmpregado() {

    const [empregados, setEmpregados] = useState([]);
    const [novoEmpregado, setNovoEmpregado] = useState({
        nomeCompleto: "",
        cpf: ""
    });

    useEffect(() => {
        fetch("http://localhost:8080/empregados")
            .then((res) => res.json())
            .then((dados) => setEmpregados(dados))
            .catch((erro) => console.log("Erro ao buscar empregados: ", erro))
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNovoEmpregado({ ...novoEmpregado, [name]: value });
    }

    function excluirEmpregado(id) {
        if (confirm("Tem certeza que deseja demitir este funcionário?")) {
            fetch(`http://localhost:8080/empregados/${id}`, {
                method: "DELETE",
            }).then(() => {
                alert("Funcionário removido!");
                setEmpregados(empregados.filter(emp => emp.idEmpregado !== id));
            }).catch(erro => alert("Erro ao excluir."));
        }
    }

    function cadastrarEmpregado(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/empregados`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoEmpregado)
        })
            .then((res) => res.json())
            .then((empregadoSalvo) => {
                alert("Contratado com sucesso!");
                setEmpregados([...empregados, empregadoSalvo]);
                setNovoEmpregado({ nomeCompleto: "" });
            })
            .catch(erro => alert("Erro ao registrar"));
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Contratar Novo Funcionário</h3>

                <form className="flex gap-4" onSubmit={cadastrarEmpregado}>
                    <input
                        type="text" name="nomeCompleto" placeholder="Nome do Funcionário"
                        className="flex-1 border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoEmpregado.nomeCompleto} onChange={handleInputChange} required
                    />

                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF (apenas números)"
                        className="border p-2 rounded focus:outline-none focus:ring-blue-400"
                        value={novoEmpregado.cpf}
                        onChange={handleInputChange}
                        maxLength="14"
                        required
                    />

                    <button type="submit" className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 font-bold transition">
                        Contratar
                    </button>
                </form>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Equipe de Vendas</h2>

            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
                {empregados.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">Nenhum funcionário cadastrado.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Nome</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">CPF</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase text-center">Vendas Realizadas</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {empregados.map((emp) => (
                                <tr key={emp.idEmpregado} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 font-medium">{emp.nomeCompleto}</td>
                                    <td className="py-3 px-4 text-gray-600">{emp.cpf}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
                                            {emp.vendas || 0}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded shadow transition"
                                            onClick={() => excluirEmpregado(emp.idEmpregado)}
                                        >
                                            Demitir
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

export default ListaEmpregado;