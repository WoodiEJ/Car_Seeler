package com.car.seeler.service;


import com.car.seeler.model.Carros;
import com.car.seeler.repository.CarroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrosService {

    private final CarroRepository carroRepository;

    public CarrosService(CarroRepository carroRepository) {
        this.carroRepository = carroRepository;
    }

    // Ações
    public List<Carros> listarCarros() { return carroRepository.findAll(); }
    public Carros registrarCarro(Carros novoCarro) { return carroRepository.save(novoCarro); }
    public void deletarCarro(Long idCarro) { carroRepository.deleteById(idCarro); }
    public Carros encontrarCarro(Long idCarro) { return carroRepository.findById(idCarro).orElse(null); }

}
