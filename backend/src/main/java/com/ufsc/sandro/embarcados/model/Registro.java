package com.ufsc.sandro.embarcados.model;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "registros")
public class Registro {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public UUID id;

	private Date data;

	private Integer leitura;

	public Registro() {

	}

	public Registro(Date data, Integer leitura) {
		this.data = data;
		this.leitura = leitura;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public UUID getId() {
		return id;
	}

	public Integer getLeitura() {
		return leitura;
	}

	public void setLeitura(Integer leitura) {
		this.leitura = leitura;
	}

	@Override
	public String toString() {
		return "Registro [id=" + id + ", data=" + data + "]";
	}

}
