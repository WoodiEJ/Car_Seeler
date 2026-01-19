package com.car.seeler;

import com.car.seeler.model.Carros;
import com.car.seeler.model.Clientes;
import com.car.seeler.model.Empregados;
import com.car.seeler.repository.CarroRepository;
import com.car.seeler.repository.ClientesRepository;
import com.car.seeler.repository.EmpregadosRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class SeelerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeelerApplication.class, args);
	}

	@Bean
	CommandLineRunner iniciarBancoDeDados(CarroRepository carroRepo,
										  ClientesRepository clienteRepo,
										  EmpregadosRepository empregadoRepo) {
		return args -> {
			if (carroRepo.count() == 0) {
				Carros c1 = new Carros();
				c1.setMarca("Toyota");
				c1.setNome("Corolla XEi");
				c1.setAno(2024);
				c1.setPreco(new BigDecimal("145000.00"));
				carroRepo.save(c1);

				Carros c2 = new Carros();
				c2.setMarca("Honda");
				c2.setNome("Civic Touring");
				c2.setAno(2023);
				c2.setPreco(new BigDecimal("180000.00"));
				carroRepo.save(c2);

				Carros c3 = new Carros();
				c3.setMarca("Fiat");
				c3.setNome("Uno com Escada");
				c3.setAno(2010);
				c3.setPreco(new BigDecimal("25000.00"));
				carroRepo.save(c3);

				System.out.println("✅ Carros de teste criados!");
			}

			if (clienteRepo.count() == 0) {
				Clientes cli1 = new Clientes();
				cli1.setNomeCompleto("Bruce Wayne");
				cli1.setCpf("000.000.000-01");
				cli1.setDataNascimento(LocalDate.of(1985, 2, 19));
				cli1.setRenda(new BigDecimal("9999999.00"));
				clienteRepo.save(cli1);

				Clientes cli2 = new Clientes();
				cli2.setNomeCompleto("Peter Parker");
				cli2.setCpf("111.111.111-02");
				cli2.setDataNascimento(LocalDate.of(2001, 8, 10));
				cli2.setRenda(new BigDecimal("1500.00"));
				clienteRepo.save(cli2);

				System.out.println("✅ Clientes de teste criados!");
			}

			if (empregadoRepo.count() == 0) {
				Empregados emp1 = new Empregados();
				emp1.setNomeCompleto("Vendedor Estrela");
				emp1.setCpf("999.888.777-66");
				emp1.setVendas(10);
				empregadoRepo.save(emp1);

				Empregados emp2 = new Empregados();
				emp2.setNomeCompleto("Estagiário Junior");
				emp2.setCpf("555.444.333-22");
				emp2.setVendas(0);
				empregadoRepo.save(emp2);

				System.out.println("✅ Empregados de teste criados!");
			}
		};
	}
}
