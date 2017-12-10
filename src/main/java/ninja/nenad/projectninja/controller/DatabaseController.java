package ninja.nenad.projectninja.controller;

import java.util.Date;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
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
//@SessionAttributes
public class DatabaseController {
	@Autowired
	private DataSource dataSource;

//	 @RequestMapping(value = "/submit", method = RequestMethod.POST)
//	 public String addNinja(@ModelAttribute("ninja") NinjaDatabase ninja,
//	 ModelMap model) {
//		 model.addAttribute("name", ninja.getName());
//		 model.addAttribute("company", ninja.getCompany());
//		 model.addAttribute("email", ninja.getEmail());
//		 model.addAttribute("message", ninja.getMessage());
//		 model.addAttribute("id", ninja.getId());
//		
//		 
//		 System.out.println("Ninja name: " + ninja.getName());
//		
//		 NinjaDao ninjaConn = new NinjaDaoImpl();
//		
//		 try {
//		
//			 System.out.println("Ninja Company: " + ninja.getCompany());
//			 ninjaConn.setDataSource(dataSource);
//			 boolean ninjaBool = ninjaConn.create(ninja);
//			
//			 System.out.println("Insert complete: " + ninjaBool);
//			
//			 return "home";
//		 } catch(Exception e) {
//			// e.printStackTrace();
//			 System.out.println("Submit failed!!!");
//		 }
//		
//		 return "result";
//	 }

	// @RequestMapping(value = "/submit", method =
	// RequestMethod.POST,consumes=MediaType.APPLICATION_JSON_VALUE, produces =
	// MediaType.APPLICATION_JSON_VALUE)
	// public @ResponseBody
	// NinjaDatabase getTime(@RequestBody NinjaDatabase ninja) {
	//
	//
	// System.out.println(new Date().toString() + " Ninja object: " + ninja);
	//
	// String result = "Success";
	// //String result = "editUserRequest";
	// //System.out.println("Debug Message from CrunchifySpringAjaxJQuery
	// Controller.." + new Date().toString());
	// return ninja;
	// }

//	@PostMapping(value = "/submit", produces = { MediaType.APPLICATION_JSON_VALUE })
//	@ResponseBody
//	public NinjaDatabase saveEmployee(@ModelAttribute NinjaDatabase ninja, BindingResult result) {
//
//		NinjaDatabase ninjaObj = new NinjaDatabase();
//
//		System.out.println(new Date().toString());
//		System.out.println("Ninja Object name: " + ninjaObj.getName());
//		System.out.println("Ninja name: " + ninja.getName());
//
//		// if(result.hasErrors()){
//		//
//		// //Get error message
//		// Map<String, String> errors = result.getFieldErrors().stream()
//		// .collect(
//		// Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)
//		// );
//		//
//		// respone.setValidated(false);
//		// respone.setErrorMessages(errors);
//		// }else{
//		// // Implement business logic to save employee into database
//		// //..
//		// respone.setValidated(true);
//		// respone.setEmployee(employee);
//		// }
//		return ninjaObj;
//	}

	// @RequestMapping(value = { "/contact" }, method = RequestMethod.GET)
	// public String contactCtrl() {
	// return "contact";
	// }
	
//	@ResponseBody
//	@RequestMapping(value = "/submit")
//	public AjaxResponseBody getSearchResultViaAjax(@RequestBody SearchCriteria search) {
//
//		AjaxResponseBody result = new AjaxResponseBody();
//		//logic
//		return result;
//
//	}
	
	@JsonView(Views.Public.class)
	@RequestMapping(value="/submit")
    public @ResponseBody AjaxResponseBody submitCtrl(@RequestBody NinjaDatabase ninjaRequest) {
		System.out.println(new Date().toString());
//		System.out.println("Ninja name: " + ninja.getName());
		
		 NinjaDao ninjaConn = new NinjaDaoImpl();
		
		AjaxResponseBody result = new AjaxResponseBody();
		System.out.println("Ninja request name: " + ninjaRequest.getName());
		result.setName(ninjaRequest.getName());
		result.setCompany(ninjaRequest.getCompany());
		result.setEmail(ninjaRequest.getEmail());
		result.setMessage(ninjaRequest.getMessage());
//			
		 try {
		
//			 System.out.println("Ninja Company: " + ninja.getCompany());
			 ninjaConn.setDataSource(dataSource);
			 boolean ninjaBool = ninjaConn.create(ninjaRequest);
			
			 System.out.println("Insert complete: " + ninjaBool);
			
			 return result;
		 } catch(Exception e) {
			// e.printStackTrace();
			 System.out.println("Submit failed!!!");
		 }
		
		return result;
	}	

}
