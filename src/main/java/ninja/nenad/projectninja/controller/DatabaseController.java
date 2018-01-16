package ninja.nenad.projectninja.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonView;

import jsonview.Views;
import model.AjaxResponseBody;
import ninja.nenad.projectninja.dao.NinjaDao;
import ninja.nenad.projectninja.daoImpl.NinjaDaoImpl;
import ninja.nenad.projectninja.domain.NinjaDatabase;

@Controller
// @SessionAttributes
public class DatabaseController {
	@Autowired
	private DataSource dataSource;
	@Autowired
	private JavaMailSender mailSender;

	@JsonView(Views.Public.class)
	@RequestMapping(value = "/submit")
	public @ResponseBody AjaxResponseBody submitCtrl(@RequestBody NinjaDatabase ninjaRequest) {
		System.out.println("Submiting: " + new Date().toString());

		NinjaDao ninjaConn = new NinjaDaoImpl();

		AjaxResponseBody result = new AjaxResponseBody();
		result.setName(ninjaRequest.getName());
		result.setCompany(ninjaRequest.getCompany());
		result.setEmail(ninjaRequest.getEmail());
		result.setMessage(ninjaRequest.getMessage());
		//
		try {

			
			
			ninjaConn.setDataSource(dataSource);
			boolean ninjaBool = ninjaConn.create(ninjaRequest);

			System.out.println("Insert complete: " + ninjaBool);
			
			String recipientAddress = "nenadn89@gmail.com";

			String emailName = ninjaRequest.getName();
			String emailCompany = ninjaRequest.getCompany();
			String emailEmail = ninjaRequest.getEmail();
			String emailMessage = ninjaRequest.getMessage();

			// prints debug info
			System.out.println("Name: " + emailName);
			System.out.println("Company: " + emailCompany);
			System.out.println("Email: " + emailEmail);
			System.out.println("Message: " + emailMessage);

			// creates a simple e-mail object
			SimpleMailMessage email = new SimpleMailMessage();
			email.setTo("recipientAddress");
			email.setSubject("Ninja Email");
//			email.setReplyTo(emailEmail);
//			email.setFrom(emailName + " " + emailCompany);
			email.setText("emailMessage");

			System.out.println("Before sending...");
			// sends the e-mail
			mailSender.send(email);

			System.out.println("After sending...");

			return result;
		} catch (Exception e) {
			// e.printStackTrace();
			System.out.println("Submit failed!!!");
		}

		// Email
		// takes input from e-mail form
		// String recipientAddress = request.getParameter("recipient");
		// String subject = request.getParameter("subject");
		// String message = request.getParameter("message");

		return result;
	}

	@JsonView(Views.Public.class)
	@RequestMapping(value = "/listMessages")
	public @ResponseBody List<AjaxResponseBody> listCtrl() {
		System.out.println("Listing: " + new Date().toString());

		NinjaDao ninjaConn = new NinjaDaoImpl();
		List<NinjaDatabase> ninjaList = new ArrayList<NinjaDatabase>();
		List<AjaxResponseBody> newList = new ArrayList<AjaxResponseBody>();
		try {

			ninjaConn.setDataSource(dataSource);

			ninjaList = ninjaConn.getAllRecords();

			for (NinjaDatabase ninja : ninjaList) {
				AjaxResponseBody newNinja = new AjaxResponseBody(ninja.getId(), ninja.getName(), ninja.getCompany(),
						ninja.getEmail(), ninja.getMessage());
				newList.add(newNinja);
			}

			return newList;
		} catch (Exception e) {
			// e.printStackTrace();
			System.out.println("Submit failed!!!");
			return null;
		}
	}

	@JsonView(Views.Public.class)
	@RequestMapping(value = "/ninjaDelete")
	public @ResponseBody boolean deleteCtrl(@RequestBody NinjaDatabase ninjaRequest) {
		System.out.println("Deleting: " + new Date().toString());

		NinjaDao ninjaConn = new NinjaDaoImpl();
		// List<NinjaDatabase> ninjaList = new ArrayList<NinjaDatabase>();
		// List<AjaxResponseBody> newList = new ArrayList<AjaxResponseBody>();
		try {

			ninjaConn.setDataSource(dataSource);

			// ninjaList = ninjaConn.getAllRecords();
			//
			System.out.println("Ninja id: " + ninjaRequest.getId());
			boolean isDeleted = ninjaConn.delete(ninjaRequest);
			System.out.println(isDeleted);

			// for(NinjaDatabase ninja : ninjaList) {
			// AjaxResponseBody newNinja = new AjaxResponseBody(ninja.getId(),
			// ninja.getName(), ninja.getCompany(), ninja.getEmail(), ninja.getMessage());
			// newList.add(newNinja);
			// }

			return isDeleted;
		} catch (Exception e) {
			// e.printStackTrace();
			// System.out.println("Submit failed!!!");
			return false;
		}
	}
}
