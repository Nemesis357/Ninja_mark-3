package ninja.nenad.projectninja.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import ninja.nenad.projectninja.domain.NinjaDatabase;

@Controller
@SessionAttributes
public class DatabaseController {

	// @Autowired
	// private NinjaService ninjaService;

	// private NinjaDatabase ninjaDb;
	
	
	

	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public String ninjaDB(@ModelAttribute("command") NinjaDatabase ninjaDb, BindingResult result) {

		// model.addAttribute("ninja", new NinjaDatabase());
		// System.out.println("Name:" + ninjaDb.getName());

		return "redirect:contacts.jsp";
	}

	@RequestMapping("/contacts")
	public ModelAndView showContacts() {

		return new ModelAndView("ninjaDb", "command", new NinjaDatabase());
	}
}
