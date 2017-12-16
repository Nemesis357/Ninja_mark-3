package model;

import com.fasterxml.jackson.annotation.JsonView;

import jsonview.Views;

public class AjaxResponseBody {

	@JsonView(Views.Public.class)
	int id;

	@JsonView(Views.Public.class)
	String name;
	
	@JsonView(Views.Public.class)
	String company;
	
	@JsonView(Views.Public.class)
	String email;
	
	@JsonView(Views.Public.class)
	String message;

	public AjaxResponseBody(int id, String name, String company, String email, String message) {
		this.id = id;
		this.name = name;
		this.company = company;
		this.email = email;
		this.message = message;
	}
	
	public AjaxResponseBody() {};

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
