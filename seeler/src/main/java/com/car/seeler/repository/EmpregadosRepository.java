package com.car.seeler.repository;

import com.car.seeler.model.Empregados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpregadosRepository extends JpaRepository<Empregados, Long> {
}
