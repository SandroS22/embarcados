package com.ufsc.sandro.embarcados.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ufsc.sandro.embarcados.model.Registro;
import com.ufsc.sandro.embarcados.repository.RegistroRepository;

@Service
public class RegistroService {

	@Autowired
	private RegistroRepository registroRepository;

	public List<Registro> getAll() {
		return registroRepository.findAll();
	}

	public HttpStatus save(Registro registro) {
		registroRepository.save(registro);
		return HttpStatus.CREATED;
	}
}
