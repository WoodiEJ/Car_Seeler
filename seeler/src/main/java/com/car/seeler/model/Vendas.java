package com.car.seeler.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
public class Vendas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal valorTotal;
    private LocalDateTime dataVenda = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "idCliente")
    private Clientes cliente;

    @ManyToOne
    @JoinColumn(name = "idEmpregado")
    private Empregados empregado;

    @OneToOne
    @JoinColumn(name = "idCarro")
    private Carros carro;

    private BigDecimal valorComissao;

}