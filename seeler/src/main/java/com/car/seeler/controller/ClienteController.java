package com.car.seeler.controller;


import com.car.seeler.model.Clientes;
import com.car.seeler.service.ClientesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClientesService clientesService;

    public ClienteController(ClientesService clientesService) {
        this.clientesService = clientesService;
    }

    @GetMapping
    public List<Clientes> listarClientes() { return clientesService.listarCliente(); }

    @PostMapping
    public Clientes registrarCliente(@RequestBody Clientes novoCliente) { return clientesService.registrarCliente(novoCliente); }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable Long id) { clientesService.deletarCliente(id); }

    @GetMapping("/{id}")
    public Clientes encontrarCliente(@PathVariable Long id) { return clientesService.encontrarCliente(id); }

}