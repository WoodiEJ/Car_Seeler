package com.car.seeler.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "carros")
public class Carros {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarro;

    @Column(nullable = false)
    private String nome;
    private String marca;
    private Integer ano;
    private BigDecimal preco;

}
