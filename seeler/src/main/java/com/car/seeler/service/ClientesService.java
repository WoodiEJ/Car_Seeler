package com.car.seeler.service;


import com.car.seeler.model.Clientes;
import com.car.seeler.repository.ClientesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientesService {

    private final ClientesRepository clientesRepository;

    public ClientesService(ClientesRepository clientesRepository) {
        this.clientesRepository = clientesRepository;
    }

    // Ações
    public Clientes registrarCliente(Clientes novoCliente) { return clientesRepository.save(novoCliente);}
    public void deletarCliente(Long idCliente) { clientesRepository.deleteById(idCliente); }
    public List<Clientes> listarCliente() { return clientesRepository.findAll(); }
    public Clientes encontrarCliente(Long idCliente) { return clientesRepository.findById(idCliente).orElse(null); }

}
