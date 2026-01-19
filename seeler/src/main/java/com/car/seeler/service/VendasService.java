package com.car.seeler.service;


import com.car.seeler.model.Carros;
import com.car.seeler.model.Clientes;
import com.car.seeler.model.Empregados;
import com.car.seeler.model.Vendas;
import com.car.seeler.repository.VendasRepository;
import org.springframework.stereotype.Service;
import com.car.seeler.repository.CarroRepository;
import com.car.seeler.repository.ClientesRepository;
import com.car.seeler.repository.EmpregadosRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VendasService {

    private final VendasRepository vendasRepository;
    private final CarroRepository carroRepository;
    private final ClientesRepository clientesRepository;
    private final EmpregadosRepository empregadosRepository;

    public VendasService(VendasRepository vendasRepository, CarroRepository carroRepository, ClientesRepository clientesRepository, EmpregadosRepository empregadosRepository) {
        this.vendasRepository = vendasRepository;
        this.carroRepository = carroRepository;
        this.clientesRepository = clientesRepository;
        this.empregadosRepository = empregadosRepository;
    }

    public List<Vendas> listarVendas() { return vendasRepository.findAll(); }
    public void deletarVenda(Long idVenda) { vendasRepository.deleteById(idVenda); }
    public Vendas encontrarVenda(Long idVenda)  { return vendasRepository.findById(idVenda).orElse(null); }

    public Vendas registrarVenda(Vendas novaVenda) {
        Clientes cliente = clientesRepository.findById(novaVenda.getCliente().getIdCliente())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        Carros carro = carroRepository.findById(novaVenda.getCarro().getIdCarro())
                .orElseThrow(() -> new RuntimeException("Carro não encontrado!"));
        Empregados empregado = empregadosRepository.findById(novaVenda.getEmpregado().getIdEmpregado())
                .orElseThrow(() -> new RuntimeException("Empregado não encontrado"));

        BigDecimal precoCarro = carro.getPreco();
        BigDecimal taxaFixa = new BigDecimal("500.00");
        BigDecimal valorFinal = precoCarro.add(taxaFixa);
        novaVenda.setValorTotal(valorFinal);
        BigDecimal taxaComissao = new BigDecimal("0.05");
        BigDecimal comissaoCalculada = precoCarro.multiply(taxaComissao);
        novaVenda.setCliente(cliente);
        novaVenda.setCarro(carro);
        novaVenda.setEmpregado(empregado);
        novaVenda.setDataVenda(LocalDateTime.now());
        novaVenda.setValorComissao(comissaoCalculada);
        empregado.setVendas(empregado.getVendas() + 1);
        empregadosRepository.save(empregado);

        return vendasRepository.save(novaVenda);
    }

}
