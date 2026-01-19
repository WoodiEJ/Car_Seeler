package com.car.seeler.model;


import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "clientes")
public class Clientes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;

    @Column(nullable = false)
    private String nomeCompleto;
    private LocalDate dataNascimento;
    private BigDecimal renda;

    @Column(unique = true, nullable = false)
    private String cpf;
}
