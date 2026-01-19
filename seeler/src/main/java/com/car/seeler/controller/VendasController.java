package com.car.seeler.controller;


import com.car.seeler.model.Vendas;
import com.car.seeler.service.VendasService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "*")
public class VendasController {

    private final VendasService vendasService;

    public VendasController(VendasService vendasService) {
        this.vendasService = vendasService;
    }

    @GetMapping
    public List<Vendas> listarVendas() { return vendasService.listarVendas(); }

    @PostMapping
    public Vendas registrarVenda(@RequestBody Vendas novaVenda) { return vendasService.registrarVenda(novaVenda); }

    @GetMapping("/{id}")
    public Vendas encontrarVenda(@PathVariable Long id) { return vendasService.encontrarVenda(id); }

    @DeleteMapping("/{id}")
    public void deletarVenda(@PathVariable Long id) { vendasService.deletarVenda(id); }

}
