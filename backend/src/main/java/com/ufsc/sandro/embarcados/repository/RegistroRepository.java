package com.ufsc.sandro.embarcados.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufsc.sandro.embarcados.model.Registro;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, UUID> {

}
