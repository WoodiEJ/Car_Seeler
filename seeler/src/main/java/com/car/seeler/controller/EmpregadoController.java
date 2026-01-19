package com.car.seeler.controller;


import com.car.seeler.model.Empregados;
import com.car.seeler.service.EmpregadosService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empregados")
@CrossOrigin(origins = "*")
public class EmpregadoController {

    private final EmpregadosService empregadosService;

    public EmpregadoController(EmpregadosService empregadosService) {
        this.empregadosService = empregadosService;
    }

    @GetMapping
    public List<Empregados> listarEmpregados() { return empregadosService.listarEmpregados(); }

    @PostMapping
    public Empregados registrarEmpregado(@RequestBody Empregados novoEmpregado) {
        if (novoEmpregado.getVendas() == null) {
            novoEmpregado.setVendas(0);
        }
        return empregadosService.registrarEmpregado(novoEmpregado);
    }

    @DeleteMapping("/{id}")
    public void deletarEmpregado(@PathVariable Long id) { empregadosService.deletarEmpregado(id); }

    @GetMapping("/{id}")
    public Empregados encontrarEmpregado(@PathVariable Long id) { return empregadosService.encontrarEmpregado(id); }

}
