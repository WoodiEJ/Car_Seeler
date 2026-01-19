package com.car.seeler.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "empregados")
public class Empregados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpregado;

    @Column(nullable = false)
    private String nomeCompleto;
    private Integer vendas;

    @Column(unique = true, nullable = false)
    private String cpf;

}
