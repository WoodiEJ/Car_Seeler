package com.car.seeler.repository;

import com.car.seeler.model.Carros;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarroRepository extends JpaRepository<Carros, Long> {
}