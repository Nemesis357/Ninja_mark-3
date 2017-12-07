package ninja.nenad.projectninja.controller;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import ninja.nenad.projectninja.dao.NinjaDao;
import ninja.nenad.projectninja.daoImpl.NinjaDaoImpl;
import ninja.nenad.projectninja.domain.NinjaDatabase;

@Controller
@SessionAttributes
public class DatabaseController {
	@Autowired
	private DataSource dataSource;

	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public String addNinja(@ModelAttribute("project-ninja")NinjaDatabase ninja, ModelMap model) {
		model.addAttribute("name", ninja.getName());
		model.addAttribute("company", ninja.getCompany());
		model.addAttribute("email", ninja.getEmail());
		model.addAttribute("message", ninja.getMessage());
		model.addAttribute("id", ninja.getId());
		
		NinjaDao ninjaConn = new NinjaDaoImpl();
				
		try {
			
			ninjaConn.setDataSource(dataSource);
			boolean ninjaBool = ninjaConn.create(ninja);
			
			return "home";
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return "result";
	}
	
//	@RequestMapping(value = { "/contact" }, method = RequestMethod.GET)
//	public String contactCtrl() {
//		return "contact";
//	}

}
