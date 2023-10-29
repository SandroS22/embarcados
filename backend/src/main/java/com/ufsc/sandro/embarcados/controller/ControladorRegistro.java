package com.ufsc.sandro.embarcados.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ufsc.sandro.embarcados.model.Registro;
import com.ufsc.sandro.embarcados.service.RegistroService;

@Controller
@RequestMapping("/")
public class ControladorRegistro {

	@Autowired
	private RegistroService registroService;

	@GetMapping
	public String getAll(ModelMap model) {
		List<Registro> registros = new ArrayList<>();
		registros.addAll(registroService.getAll());
		model.addAttribute("registros", registros);
		return "registros";
	}

	@PostMapping
	@ResponseBody
	public HttpStatus criarRegistro(@RequestParam String construir) {
		Registro novoRegistro = new Registro(new Date());
		registroService.save(novoRegistro);
		return HttpStatus.CREATED;
	}
}
