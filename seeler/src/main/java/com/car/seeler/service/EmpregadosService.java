package com.car.seeler.service;


import com.car.seeler.model.Empregados;
import com.car.seeler.repository.EmpregadosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpregadosService {

    private final EmpregadosRepository empregadosRepository;

    public EmpregadosService(EmpregadosRepository empregadosRepository) {
        this.empregadosRepository = empregadosRepository;
    }

    // Ações
    public List<Empregados> listarEmpregados() { return empregadosRepository.findAll(); }
    public void deletarEmpregado(Long idEmpregado) { empregadosRepository.deleteById(idEmpregado); }
    public Empregados registrarEmpregado(Empregados novoEmpregado) { return empregadosRepository.save(novoEmpregado); }
    public Empregados encontrarEmpregado(Long idEmpregado) { return empregadosRepository.findById(idEmpregado).orElse(null); }

}
