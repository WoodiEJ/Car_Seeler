package com.car.seeler.controller;


import com.car.seeler.model.Carros;
import com.car.seeler.service.CarrosService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carros")
@CrossOrigin(origins = "*")
public class CarrosController {

    private final CarrosService carrosService;

    public CarrosController(CarrosService carrosService) {
        this.carrosService = carrosService;
    }

    @GetMapping
    public List<Carros> listarCarros() { return carrosService.listarCarros(); }

    @DeleteMapping("/{id}")
    public void deletarCarro(@PathVariable Long id) { carrosService.deletarCarro(id); }

    @PostMapping
    public Carros registrarCarro(@RequestBody Carros novoCarro) { return carrosService.registrarCarro(novoCarro); }

    @GetMapping("/{id}")
    public Carros encontrarCarro(@PathVariable Long id)  { return carrosService.encontrarCarro(id); }

}
