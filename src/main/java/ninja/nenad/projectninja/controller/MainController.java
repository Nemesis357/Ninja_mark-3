package ninja.nenad.projectninja.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ninja.nenad.projectninja.domain.NinjaDatabase;

@Controller
@RequestMapping("/")
public class MainController {

	
	@RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public String homeCtrl(Locale locale, Model model) {
		return "redirect:/home";
	}

	@RequestMapping(value = { "/home" }, method = RequestMethod.GET)
	public String homeNewCtrl(Locale locale, Model model) {
		return "home";
	}

	@RequestMapping(value = { "/about" }, method = RequestMethod.GET)
	public String aboutCtrl() {
		return "about";
	}
	
	@RequestMapping(value = { "/projects" }, method = RequestMethod.GET)
	public String projectsCtrl() {
		return "projects";
	}

	@RequestMapping(value = { "/login" }, method = RequestMethod.GET)
	public ModelAndView loginCtrl(@RequestParam(value = "error",required = false) String error,
		@RequestParam(value = "logout",	required = false) String logout) {
			
			ModelAndView model = new ModelAndView();
			if (error != null) {
				model.addObject("error", "Invalid Credentials provided.");
			}

			if (logout != null) {
				model.addObject("message", "Logged out from Ninja Site successfully.");
			}

			model.setViewName("login");
			return model;
		}
	
	@RequestMapping(value = { "/shutdown" }, method = RequestMethod.GET)
	public String shutdownCtrl() {
		return "shutdown";
	}

	// Form
	@RequestMapping(value = "/contact", method = RequestMethod.GET)
	public ModelAndView contactCtrl() {
		return new ModelAndView("contact", "command", new NinjaDatabase());
	}
}
